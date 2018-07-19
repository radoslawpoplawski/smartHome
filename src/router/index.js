import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from '../components/main.component'
import LoginComponent from '../components/login.component'
import {ROUTING} from '../assets/js/routing.const'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: ROUTING.main,
      name: 'Main',
      component: MainComponent
    },{
      path: ROUTING.login,
      name: 'Login',
      component: LoginComponent
    }
  ]
})
