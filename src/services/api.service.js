import Vue from 'vue'
import {ENDPOINTS} from '../assets/js/endpoints.const'

class ApiService {
  getDataFromApi (url, data, options = {}) {
    return Vue.http.get('http://' + window.location.hostname + ':3000' + url, data, options)
  }

  // loginDo (data) {
  //   return this.getDataFromApi('/login-do', data)
  // }

  fanOn () {
    return this.getDataFromApi('/fan/1')
  }

  fanOff () {
    return this.getDataFromApi('/fan/0')
  }

  blindUp() {
    return this.getDataFromApi('/up')
  }

  blindDown() {
    return this.getDataFromApi('/down')
  }
}

export let apiService = new ApiService()
