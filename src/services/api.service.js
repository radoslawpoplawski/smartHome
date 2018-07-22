import Vue from 'vue'
import {ENDPOINTS} from '../assets/js/endpoints.const'

class ApiService {
  getDataFromApi (url, data, options = {}) {
    return Vue.http.post('http://' + window.location.hostname + ':8080' + url, data, options)
  }

  loginDo (data) {
    return this.getDataFromApi('/login-do', data)
  }
}

export let apiService = new ApiService()
