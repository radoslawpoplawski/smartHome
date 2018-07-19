import Vue from 'vue'
import {ENDPOINTS} from '../assets/js/endpoints.const'

class ApiService {
  getDataFromApi (url, data, options = {}) {
    return Vue.http.post(process.env.API + url, data, options)
  }
}

export let apiService = new ApiService()
