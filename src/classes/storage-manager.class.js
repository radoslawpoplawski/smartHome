import {STORAGE_TYPES} from '../assets/js/storage.const'

const mod = '__storage_test__'

class StorageManager {
  constructor () {
    this.checkStorageAvailability()
    this.fallbackStorage = {
      items: {},
      setItem: function (key, value) {
        this.items[key] = value
      },
      getItem: function (key) {
        if (this.items.hasOwnProperty(key)) {
          return this.items[key]
        }
        return null
      },
      removeItem: function (key) {
        delete this.items[key]
      },
      clear: function () {
        this.items = {}
      },
      key: function (index) {
        if (typeof index !== 'number') {
          index = 0
        }
        return Object.keys(this.items)[index]
      },
      hasOwnProperty: function (key) {
        return this.items.hasOwnProperty(key)
      }
    }
  }

  isSet (key, storageType) {
    let storageInstance = this.getStorage(storageType)
    return storageInstance.hasOwnProperty(key)
  }

  isEmpty (key, storageType) {
    let storageInstance = this.getStorage(storageType)
    return storageInstance.hasOwnProperty(key) && !storageInstance.getItem(key)
  }

  set (key, value, storageType) {
    let storageInstance = this.getStorage(storageType)
    storageInstance.setItem(key, JSON.stringify(value))
  }

  get (key, storageType) {
    let storageInstance = this.getStorage(storageType)
    return JSON.parse(storageInstance.getItem(key))
  }

  remove (key, storageType) {
    let storageInstance = this.getStorage(storageType)
    storageInstance.removeItem(key)
  }

  removeAll (storageType) {
    let storageInstance = this.getStorage(storageType)
    storageInstance.clear()
  }

  isStorageAvailable () {
    return this.storageAvailability
  }

  checkStorageAvailability () {
    try {
      localStorage.setItem(mod, mod)
      localStorage.removeItem(mod)
      this.storageAvailability = true
    } catch (e) {
      this.storageAvailability = false
    }
  }

  getStorage (storageType) {
    if (!this.isStorageAvailable()) {
      return this.fallbackStorage
    }

    switch (storageType) {
    case STORAGE_TYPES.instance:
      return this.fallbackStorage

    case STORAGE_TYPES.session:
      return sessionStorage

    default:
      return localStorage
    }
  }
}

export let storageManager = new StorageManager()
