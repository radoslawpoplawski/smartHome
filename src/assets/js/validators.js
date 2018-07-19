const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegex = /^\+?\d{5,11}$/
const pinRegex = /^\d{4}$/

export let required = function (value) {
  if (typeof value === 'boolean') {
    return value
  } else {
    return !!value || value === 0
  }
}

export let email = function (string) {
  return emailRegex.test(string)
}

export let phone = function (string) {
  return phoneRegex.test(string)
}

export let pin = function (string) {
  return pinRegex.test(string)
}

export let number = function (value) {
  return !isNaN(value)
}

export let integer = function (value) {
  return !isNaN(value) && value % 1 === 0
}

export let amount = function (value) {
  return !isNaN(value) && parseFloat(value) > 0
}

export let length = function (number) {
  return function (value) {
    return value && value.length === number
  }
}

export let minValue = function (minValue) {
  return function (value) {
    return value && value >= minValue
  }
}

export let maxValue = function (maxValue) {
  return function (value) {
    return value && value <= maxValue
  }
}

export let sameAs = function (name) {
  return function (value, formValues) {
    return value === formValues[name]
  }
}

export let sum = function (sum, name) {
  return function (value, formValues) {
    return parseFloat(value) + parseFloat(formValues[name]) === sum
  }
}
