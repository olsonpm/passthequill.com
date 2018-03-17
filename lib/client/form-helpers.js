//
// README
//  - I just wanted to point out that this code is much more complex than it
//    needs to be all because vue really has an attachment to a very
//    ill-defined 'this'.
//

//---------//
// Imports //
//---------//

import {
  all,
  assignOver,
  getValueFrom,
  map,
  mMap,
  mSet,
  passThrough,
  reduce,
} from 'fes'

//
//------//
// Init //
//------//

const defaultInputObject = getDefaultInputObject(),
  { assign, keys } = Object

//
//------//
// Main //
//------//

/*

"createFormObject" creates a <form object> which has the shape:
{
  inputIdToObject: {
    <inputId>: <input object>
  },

  isValid: () => bool
    * this calls the computed property

  getSubmitted: () => bool
  __setSubmitted: bool => <form object>
    * these proxy to `formData.submitted`
    * 'setSubmitted' is preceded by two underscores to indicate it should only
      be used by the <my-form> component.  This keeps the 'submitted' state in
      both the <my-form> and consuming component in sync.  If you have a better
      idea on how to structure the code or name this method then please tell
      me :).  My solution feels hacky
}

note <inputId> should just be the input id camelcased but this is
merely convention

<input object> has the shape:
{
  approve: value => bool
    * this function must be defined by the consumer
    * it's important to note this function alone only tests the value provided.
      The computed property generated will handle things like whether the form
      was submitted, whether the input isRequired, etc - this function should
      ignore all that.

  isRequired: bool | null
    * this value should only ever be initialized - never modified later

  getValue: () => <any>
  setValue: <any> => <input object>
    * these proxy to `formData.inputs.<inputId>`
},

This 'form object' is used to derive a lot of helpful structures which work
within vue's framework

*/

const createFormObject = (inputIdToInitialObject, componentInstance) => {
  const inputValueIsValidMethod = passThrough(inputIdToInitialObject, [
    keys,
    map(inputId => `${inputId}_isValid`),
  ])

  return passThrough(inputIdToInitialObject, [
    mMap(assignOver(defaultInputObject)),
    toFormObject,
  ])

  // scoped helper functions

  function toFormObject(inputIdToObject) {
    const formObject = {
      inputIdToObject,
      isValid: () =>
        all(getValueFrom(componentInstance))(inputValueIsValidMethod),
      getSubmitted: () => componentInstance.formData.submitted,
      __setSubmitted: val => {
        componentInstance.formData.submitted = val
        return formObject
      },
    }

    return formObject
  }
}

//
// Currently the only computed data needed are whether each input is valid and
//   whether the form has been submitted.  Note we're unfortunately crammed into
//   a flat structure hence the awkward string namespacing.  Oh and also note we
//   have to use 'this' "because vue".
//
const createComputedFormData = inputIdToInitialObject =>
  reduce(
    (computedData, _initialObject, inputId) =>
      mSet(`${inputId}_isValid`, function() {
        const { formData, formObject } = this,
          inputObject = formObject.inputIdToObject[inputId],
          inputValue = formData.inputs[inputId]

        //
        // TODO: make this more succinct yet maintain readability.  At least I
        //   think it's possible? #imbadatlogic
        //
        if (!formData.submitted) return true
        else if (!inputObject.isRequired && inputValue === null) return true
        else if (inputObject.isRequired && inputValue === null) return false
        else {
          const errorMessage = inputObject.approve(inputValue)
          return !errorMessage
        }
      })(computedData),
    {}
  )(inputIdToInitialObject)

//
// Currently the only two-way data needed are the form submitted value and
//   input values
//
const createFormData = formObject => {
  const inputs = reduce(
    (result, inputObject, id) =>
      assign(result, {
        [id]: inputObject.initialValue,
      }),
    {}
  )(formObject.inputIdToObject)

  return { inputs, submitted: false }
}

//
//------------------//
// Helper Functions //
//------------------//

function getDefaultInputObject() {
  return {
    initialValue: null,
  }
}

//
//---------//
// Exports //
//---------//

export { createComputedFormData, createFormData, createFormObject }
