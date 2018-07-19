//
// README
//   - unfortunateley there doesn't seem to be a great way to automatically
//     validate compiled template input.  The below approach is manual.
//

//---------//
// Imports //
//---------//

import crypto from 'crypto'
import handlebars from 'handlebars'
import path from 'path'

import { baseUrl } from 'project-root/config/app'
import { readFile } from 'server/utils'
import { apply, combine, map, mMap, passThrough } from 'fes'
import {
  approveAllPropertiesAreLaden,
  createApproveSimpleInput,
  repeatString,
  resolveAllProperties,
} from 'universal/utils'

//
//------//
// Init //
//------//

const globalTemplateVariables = getGlobalTemplateVariables(),
  templateNameToRequiredProperties = getTemplateNameToRequiredProperties()

registerHandlebarsHelpers()

//
//------//
// Main //
//------//

let templateNameToCompile

const getTemplateNameToCompile = () => {
  if (!templateNameToCompile) {
    templateNameToCompile = resolveAllProperties({
      youAreInvited: readTemplates('you-are-invited'),
      youCreatedARoom: readTemplates('you-created-a-room'),
    }).then(templateNameToHtmlAndText => {
      return passThrough(templateNameToHtmlAndText, [
        mMap(compileHtmlAndText),
        mMap(toCompileFunction),
      ])
    })
  }

  return templateNameToCompile
}

//
//------------------//
// Helper Functions //
//------------------//

function compileHtmlAndText(htmlAndText) {
  return mMap(handlebars.compile)(htmlAndText)
}

//
// This method should only ever be called on pre-validated input, so I'm only
//   going to perform light validation here as a sanity check.
//
function toCompileFunction(compiledHtmlAndText, templateName) {
  const approve = createApproveSimpleInput(
      `compiling template '${templateName}'`
    ),
    requiredProperties = templateNameToRequiredProperties[templateName]

  return approveThenCompile

  function approveThenCompile(...arrayOfArguments) {
    const maybeError =
      approve(arrayOfArguments, requiredProperties) ||
      approveAllPropertiesAreLaden(arrayOfArguments[0])
    if (maybeError) return { error: maybeError }

    const finalTemplateVariables = combine(arrayOfArguments[0])(
      globalTemplateVariables
    )

    return map(apply([finalTemplateVariables]))(compiledHtmlAndText)
  }
}

//
// Per usual - input must be an object whose properties match the expected
//   template variables
//

function getTemplateNameToRequiredProperties() {
  return {
    youAreInvited: new Set(['emailSentHash', 'playerHash', 'roomHash']),
    youCreatedARoom: new Set(['emailSentHash', 'playerHash', 'roomHash']),
  }
}

function readTemplates(fileName) {
  return resolveAllProperties({
    html: readFile(
      path.resolve(__dirname, `./templates/${fileName}.inline.html`)
    ),
    text: readFile(path.resolve(__dirname, `./templates/${fileName}.txt`)),
  })
}

function getGlobalTemplateVariables() {
  return { global: { externalBaseUrl: baseUrl.external } }
}

function registerHandlebarsHelpers() {
  //
  // This helper is used to prevent gmail from quoting text
  //   from here: https://stackoverflow.com/a/41191561/984407
  //
  handlebars.registerHelper('invisibleRandomSpan', () => {
    const time = String(Date.now()),
      hash = crypto
        .createHash('md5')
        .update(time)
        .digest('hex')
        .substr(0, 5)

    return `<span style="display: none !important;">${hash}</span>`
  })
}

//
//---------//
// Exports //
//---------//

export default getTemplateNameToCompile
