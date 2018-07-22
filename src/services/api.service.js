import Vue from 'vue'
import {ENDPOINTS} from '../assets/js/endpoints.const'

class ApiService {
  getDataFromApi (url, data, options = {}) {
    console.log('asd', process.env.API);
    return Vue.http.post(process.env.API + url, data, options)
  }

  loginDo (data) {
    return this.getDataFromApi('/login-do', data)
  }
}

export let apiService = new ApiService()
