import {validationMessages} from '../assets/js/messages.const'

class FormValidation {
  isErrorForField (fieldName, formValidity) {
    if (!fieldName || !formValidity) {
      return false
    }
    return (formValidity[fieldName].$invalid && formValidity[fieldName].$dirty) || (formValidity[fieldName].$invalid && formValidity.$submitted)
  }

  getErrorForField (fieldName, formValidity) {
    if (!fieldName || !formValidity || formValidity[fieldName].$valid) {
      return ''
    }
    let firstError = Object.keys(formValidity[fieldName].$errors)[0]

    return formValidity[fieldName].$errors[firstError]
  }

  setFormAsSubmitted (form) {
    form.$validity.$submitted = true
  }

  resetForm (form, formValidators) {
    form.$validity = {}
    this.validateForm (form, {}, formValidators)
  }

  validateForm (form, formValues, formValidators) {
    if (!form) {
      return
    }

    if (!form.$validity) {
      form.$validity = {}
    }

    Object.keys(formValidators).forEach(fieldName => {
      if (!formValues[fieldName] && form.$validity[fieldName] && form.$validity[fieldName].$model === formValues[fieldName]) {
        return
      }
      this.validateField(fieldName, formValues[fieldName], formValidators[fieldName], form, formValues)
    })

    this.checkFormAfterFieldsValidation(form)

    return form.$validity
  }

  validateField (fieldName, fieldValue, fieldValidators, fieldForm, fieldFormValues) {
    let result = true
    let errorObj = {}

    Object.keys(fieldValidators).forEach(validator => {
      if (!fieldValidators[validator](fieldValue, fieldFormValues)) {
        result = false
        errorObj[validator] = this.getDefaultValidationErrorText(validator)
      }
    })

    let resultObj = {$model: fieldValue, $dirty: true, $valid: result, $invalid: !result, $errors: errorObj}

    if (!fieldValue && !fieldForm.$validity[fieldName]) {
      resultObj.$dirty = false
    }

    let validateResult = {}
    validateResult[fieldName] = resultObj

    Object.assign(fieldForm.$validity, validateResult)
  }

  addBackendErrorsToForm (errors, form) {
    Object.keys(errors).forEach(fieldName => {
      let resultObj = {
        $valid: false,
        $invalid: true,
        $errors: {
          backend: errors[fieldName]
        }
      }

      Object.assign(form.$validity[fieldName], resultObj)
    })

    this.checkFormAfterFieldsValidation(form)
  }

  checkFormAfterFieldsValidation (form) {
    let formInvalidity = Object.keys(form.$validity)
      .filter(key => { return !/^\$/.test(key) }).some(key => { return form.$validity[key].$invalid })
    form.$validity.$valid = !formInvalidity
    form.$validity.$invalid = formInvalidity
  }

  getDefaultValidationErrorText (fieldError) {
    switch (fieldError) {
    case 'required':
      return validationMessages.required

    case 'amount':
      return validationMessages.amount

    case 'integer':
      return validationMessages.integer

    default:
      return validationMessages.invalid
    }
  }
}

export let formValidation = new FormValidation()
