//---------//
// Imports //
//---------//

import dedent from 'dedent'
import nodemailer from 'nodemailer'
import pify from 'pify'

import templateNameToCompile from './template-name-to-compile'
import debug from 'project-root/config/debug'

import { baseUrl } from 'project-root/config/app'
import { combineAll, map, mSet, omit, reduce, transformProperties } from 'fes'
import { smtpAuth } from 'project-root/config/app'
import { handleServerError, handleServerErrorSync } from 'server/utils'
import { createApproveSimpleInput, jstring, mAddToSet } from 'universal/utils'

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
  templateNames = Object.keys(templateNameToInfo),
  send = pify(smtpTransporter.sendMail.bind(smtpTransporter))

const templateNameToSend = reduce(createSendFunction, {})(templateNames)

//
//------------------//
// Helper Functions //
//------------------//

function createSendFunction(templateNameToSend, templateName) {
  const approveInput = createApproveSimpleInput(
      `sending email '${templateName}'`
    ),
    { messageData, requiredProperties, type } = templateNameToInfo[
      templateName
    ],
    approveThenCompileToHtml = templateNameToCompile[templateName]

  return mSet(templateName, approveThenSend)(templateNameToSend)

  // scoped helper functions

  function approveThenSend(...arrayOfArguments) {
    const error = approveInput(arrayOfArguments, requiredProperties)
    if (error) return handleSendError(error)

    const input = arrayOfArguments[0],
      { error: err, html } = approveThenCompileToHtml(input.templateVariables)
    if (err) return handleSendError(err)

    // valid input, phew!

    const { emailSentHash } = input.templateVariables,
      listUnsubscribeUrl =
        baseUrl.external + `/email/unsubscribe/${type}/${emailSentHash}`,
      inputMessageData = omit('templateVariables')(input),
      finalMessageData = combineAll.objects([
        messageData,
        inputMessageData,
        {
          html,
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

export default templateNameToSend
