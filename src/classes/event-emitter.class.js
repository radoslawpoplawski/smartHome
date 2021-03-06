import {isFunction} from '../assets/js/tools'

class EventEmitter {
  constructor () {
    this.listeners = new Map()
  }

  addListener (label, callback) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }

  removeListener (label, callback) {
    let listeners = this.listeners.get(label)
    let index

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        if (isFunction(listener) && listener === callback) {
          i = index
        }
        return i
      }, -1)

      if (index === -1) {
        return false
      }

      listeners.splice(index, 1)
      this.listeners.set(label, listeners)
      return true
    }
    return false
  }

  emit (label, ...args) {
    let listeners = this.listeners.get(label)

    if (!listeners || !listeners.length) {
      return false
    }

    listeners.forEach((listener) => {
      listener(...args)
    })
    return true
  }
}

export let eventEmitter = new EventEmitter()
