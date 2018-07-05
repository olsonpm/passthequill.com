//
// README
//   - unfortunateley there doesn't seem to be a great way to automatically
//     validate compiled template input.  The below approach is manual.
//

//---------//
// Imports //
//---------//

import handlebars from 'handlebars'
import path from 'path'

import { baseUrl } from 'project-root/config/app'
import { readFile } from 'server/utils'
import { createApproveSimpleInput, resolveAllProperties } from 'universal/utils'
import { apply, combine, map, mMap, passThrough } from 'fes'

//
//------//
// Init //
//------//

const globalTemplateVariables = getGlobalTemplateVariables(),
  templateNameToRequiredProperties = getTemplateNameToRequiredProperties()

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
    const error = approve(arrayOfArguments, requiredProperties)
    if (error) return { error }

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

//
//---------//
// Exports //
//---------//

export default getTemplateNameToCompile
