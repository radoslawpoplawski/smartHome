import {eventEmitter} from './event-emitter.class'

export const messageTypes = {
  success: 'success',
  info: 'info',
  error: 'error'
}

class MessageManager {
  constructor () {
    this.messages = []
  }

  addMessageSuccess (text) {
    this.addMessage(text, messageTypes.success)
  }

  addMessageError (text) {
    this.addMessage(text, messageTypes.error)
  }

  addMessageInfo (text) {
    this.addMessage(text, messageTypes.info)
  }

  addMessage (text, type) {
    if (!text || !type || Object.keys(messageTypes).indexOf(type) === -1) {
      return
    }

    let messageTemp = {
      text: text,
      type: type
    }

    this.messages.push(messageTemp)
    eventEmitter.emit('show-message')
  }

  isMessageToShow () {
    return !!this.messages.length
  }

  getMessages () {
    return this.messages
  }

  removeMessage (key) {
    this.messages.splice(key, 1)
    eventEmitter.emit('close-message')
  }

  removeMessages () {
    this.messages = []
    eventEmitter.emit('clear-messages')
  }
}

export let messageManager = new MessageManager()
