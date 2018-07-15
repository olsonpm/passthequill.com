//---------//
// Imports //
//---------//

import dedent from 'dedent'
import nodemailer from 'nodemailer'
import pify from 'pify'

import debug from 'project-root/config/debug'
import getTemplateNameToCompile from './get-template-name-to-compile'

import { baseUrl } from 'project-root/config/app'
import { smtpAuth } from 'project-root/config/app'
import { handleServerError, handleServerErrorSync } from 'server/utils'
import { combineAll, map, omit, transformProperties } from 'fes'
import {
  approveAllPropertiesAreLaden,
  createApproveSimpleInput,
  jstring,
  mAddToSet,
} from 'universal/utils'

//
//------//
// Init //
//------//

const { preventEmailFromSending } = debug

//
//------//
// Main //
//------//

const smtpTransporter = createSmtpTransporter(),
  templateNameToInfo = getTemplateNameToInfo(),
  send = pify(smtpTransporter.sendMail.bind(smtpTransporter))

let templateNameToSend

const getTemplateNameToSendEmail = () => {
  if (!templateNameToSend) {
    templateNameToSend = createTemplateNameToSend()
  }
  return templateNameToSend
}

//
//------------------//
// Helper Functions //
//------------------//

function createTemplateNameToSend() {
  return getTemplateNameToCompile().then(map(toApproveThenSend))

  // scoped helper functions

  function toApproveThenSend(approveThenCompileHtmlAndText, templateName) {
    const approveInput = createApproveSimpleInput(
        `sending email '${templateName}'`
      ),
      { messageData, requiredProperties, type } = templateNameToInfo[
        templateName
      ]

    return function approveThenSend(...arrayOfArguments) {
      const maybeError =
        approveInput(arrayOfArguments, requiredProperties) ||
        approveAllPropertiesAreLaden(arrayOfArguments[0])
      if (maybeError) return handleSendError(maybeError)

      const input = arrayOfArguments[0],
        { error: err, html, text } = approveThenCompileHtmlAndText(
          input.templateVariables
        )
      if (err) return handleSendError(err)

      // valid input, phew!

      const { emailSentHash } = input.templateVariables,
        listUnsubscribeUrl =
          baseUrl.external + `/api/email/unsubscribe/${type}/${emailSentHash}`,
        inputMessageData = omit('templateVariables')(input),
        finalMessageData = combineAll.objects([
          messageData,
          inputMessageData,
          {
            html,
            text,
            list: {
              unsubscribe: {
                url: listUnsubscribeUrl,
              },
            },
          },
        ])

      if (process.env.NODE_ENV === 'development' && preventEmailFromSending) {
        return Promise.resolve()
      }

      return send(finalMessageData).catch(
        handleServerError(createErrorMessage, [type, emailSentHash, input])
      )
    }
  }
}

function createErrorMessage(type, emailSentHash, input) {
  return {
    friendly: 'sending an email',
    detailed: dedent(`
      Error occurred while sending an email
      type: ${type}
      emailSentHash: ${emailSentHash}
      templateVariables: ${jstring(input.templateVariables)}
    `),
  }
}

function handleSendError(error) {
  return handleServerErrorSync(
    'an error occurred while sending an email',
    error
  )
}

function getTemplateNameToInfo() {
  return map(normalizeTemplateInfo)({
    youAreInvited: {
      type: 'invitation',
      requiredProperties: new Set(['to']),
      messageData: {
        from: smtpAuth.user,
        subject: 'Your friend has invited you to Pass The Quill',
      },
    },

    youCreatedARoom: {
      type: 'room-created',
      requiredProperties: new Set(['to']),
      messageData: {
        from: smtpAuth.user,
        subject: 'You created a room',
      },
    },
  })
}

function normalizeTemplateInfo(templateInfo) {
  return transformProperties({
    requiredProperties: mAddToSet('templateVariables'),
  })(templateInfo)
}

function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: 'mail.passthequill.com',
    auth: smtpAuth,
    authMethod: 'LOGIN',
    secure: false,
    requireTLS: true,
    pool: true,
    rateLimit: 5,
  })
}

//
//---------//
// Exports //
//---------//

export default getTemplateNameToSendEmail
