<script type="text/x-template" id="login-section-template">
    <section class="loginSection">
        <label for="loginInput">Login</label><input id="loginInput" type="text" v-model="login"><br>
        <label for="passwordInput">Hasło</label><input id="passwordInput" type="password" v-model="password">
        <button v-on:click="loginUser">Zaloguj</button>
    </section>
</script>

<script type="text/javascript">
    (function(){
        Vue.component('login-section', {
            template: '#login-section-template',
            data: function () {
                return {
                    login: null,
                    password: null
                }
            },
            methods: {
                loginUser: function () {
                    $.ajax({
                        url: url + 'login-do',
                        method: 'POST',
                        data: {
                            login: this.login,
                            password: this.password
                        }
                    })
                }
            }
        });
    })()
</script>
