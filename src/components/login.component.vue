<template>
    <div class="container">
        <h1>Zaloguj się do SmartHome</h1>
        <div class="login-box">
            <form name="login-form" id="login-form" novalidate>
                <div class="form-group">
                    <label for="login">Login</label>
                    <input type="text" id="login" name="login"/>
                </div>
                <div class="form-group">
                    <label for="password">Hasło</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div class="form-group">
                    <button type="submit">Zaloguj</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'LoginComponent',
    data () {
      return {}
    },
    methods: {},
    created () {}
  }
</script>

<style src="../assets/scss/components/login.component.scss" lang="scss"></style>
