//
// README
//   - unfortunateley there doesn't seem to be a great way to automatically
//     validate compiled template input.  The below approach is manual.
//

//---------//
// Imports //
//---------//

import handlebars from 'handlebars'

import youAreInvited from './templates/you-are-invited.html'
import youCreatedARoom from './templates/you-created-a-room.html'

import { baseUrl } from 'project-root/config/app'
import { createApproveSimpleInput } from 'universal/utils'
import { combine, map, mSet, reduce } from 'fes'

//
//------//
// Init //
//------//

const globalTemplateVariables = getGlobalTemplateVariables(),
  templateNameToCompiledTemplate = getTemplateNameToCompiledTemplate(),
  templateNameToRequiredProperties = getTemplateNameToRequiredProperties()

//
//------//
// Main //
//------//

const templateNameToCompile = reduce(createCompileFunction, {})(
  Object.keys(templateNameToCompiledTemplate)
)

//
//------------------//
// Helper Functions //
//------------------//

//
// This method should only ever be called on pre-validated input, so I'm only
//   going to perform light validation here as a sanity check.
//
function createCompileFunction(result, templateName) {
  const compiledTemplate = templateNameToCompiledTemplate[templateName],
    approve = createApproveSimpleInput(`compiling template '${templateName}'`),
    requiredProperties = templateNameToRequiredProperties[templateName]

  return mSet(templateName, approveThenCompile)(result)

  function approveThenCompile(...arrayOfArguments) {
    const error = approve(arrayOfArguments, requiredProperties)
    if (error) return { error }

    const finalTemplateVariables = combine(arrayOfArguments[0])(
      globalTemplateVariables
    )

    return { html: compiledTemplate(finalTemplateVariables) }
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

function getTemplateNameToCompiledTemplate() {
  return map(handlebars.compile)({
    youAreInvited,
    youCreatedARoom,
  })
}

function getGlobalTemplateVariables() {
  return { global: { externalBaseUrl: baseUrl.external } }
}

//
//---------//
// Exports //
//---------//

export default templateNameToCompile
