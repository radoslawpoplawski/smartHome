<template>
    <div class="container">
        <h1>Zaloguj się do SmartHome</h1>
        <div class="login-box">
            <form name="login-form" id="login-form" v-on:submit.prevent="submitLoginForm" novalidate>
                <div class="form-group">
                    <label for="login">Login</label>
                    <input type="text" id="login" name="login" v-model="data.login"/>
                </div>
                <div class="form-group">
                    <label for="password">Hasło</label>
                    <input type="password" id="password" name="password" v-model="data.password"/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" type="submit">Zaloguj</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import {apiService} from "../services/api.service";

  export default {
    name: 'LoginComponent',
    data () {
      return {
        data: {}
      }
    },
    methods: {
      submitLoginForm () {
        console.log('submit', this.data.login, this.data.password);
        apiService.loginDo(this.data).then(
          response => {
            console.info('ok');
            alert(JSON.stringify(response))
          },
          error => {
            console.error('error');
            alert(JSON.stringify(error))
          })
          .finally(
            () => {

            }
          )
      }
    },
    created () {}
  }
</script>

<style src="../assets/scss/components/login.component.scss" lang="scss"></style>
