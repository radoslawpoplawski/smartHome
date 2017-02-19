var url = document.url,
    leds = {
        red: {
            name: 'switch_red',
            colour: 'red'
        },
        yellow: {
            name: 'switch_yellow',
            colour: 'yellow'
        },
        green: {
            name: 'switch_green',
            colour: 'green'
        }
    };

var switchRed = new Vue({
    el: "#switchRed",
    template: '#switch-template',
    data: {
        name: leds.red.name,
        model: 0
    },
    methods: {
        update: function(e) {
            led(leds.red.colour, this.model);
        }
    }
});

if (/localhost/.test(document.url)) {
    url = 'http://192.168.1.109:3000/'
}

new Vue({
    el: "#ledRedCircle",
    template: '#ledRed-circle-template'
});

var switchYellow = new Vue({
    el: "#switchYellow",
    template: '#switch-template',
    data: {
        name: leds.yellow.name,
        model: 0
    },
    methods: {
        update: function(e) {
            led(leds.yellow.colour, this.model);
        }
    }
});

new Vue({
    el: "#ledYellowCircle",
    template: '#ledYellow-circle-template',
    computed: {
        isYellowLedTurnOn: function() {
            return switchYellow.model === 1;
        }
    }
});

var switchGreen = new Vue({
    el: "#switchGreen",
    template: '#switch-template',
    data: {
        name: leds.green.name,
        model: 0
    },
    methods: {
        update: function(e) {
            led(leds.green.colour, this.model);
        }
    }
});

new Vue({
    el: "#ledGreenCircle",
    template: '#ledGreen-circle-template',
    computed: {
        isGreenLedTurnOn: function() {
            return switchGreen.model === 1;
        }
    }
});

new Vue({
    el: "#button",
    template: '#button-template',
    methods: {
        click: function(e) {
            pushButton();
        }
    }
});

var mainBox = new Vue({
    el: "#mainBox",
    data: {
        user: {name: 'guest'}
    },
    computed: {
        showBox: function() {
            return !!this.user.name;
        },
        isRedLedTurnOn: function() {
            return switchRed.model === 1;
        }
    }
});

new Vue({
    el: "#loginBox",
    template: '#login-box-template',
    data: {
        loginValue: '',
        passwordValue: ''
    },
    methods: {
        loginUser: function() {
            $.ajax({
                url: url + 'login-do',
                method: 'POST',
                dataType: 'json',
                data: {
                    login: this.loginValue,
                    password: this.passwordValue
                }
            }).then(function(response) {
                if (response.status.code == 200) {
                    mainBox.user.name = response.data.user;
                }
            })
        }
    },
    computed: {
        showLoginBox: function() {
            return !mainBox.user.name;
        }
    }
});


if ("WebSocket" in window) {
     var ws = new WebSocket("ws://192.168.1.109:8080", "echo-protocol");

     ws.onopen = function() {
         console.info('Połączenie WebSocket z 192.168.1.109');
     };

     ws.onmessage = function(event) {
         var data = JSON.parse(event.data);

         switchRed.model = data.led.red.value;
         switchYellow.model = data.led.yellow.value;
         switchGreen.model = data.led.green.value;
         console.log(mainBox);
     };

     ws.onclose = function() {
         console.info('Połączenie WebSocket zostało zerwane');
     };
}

function led(colour, value) {
  $.ajax({
    url: url + 'led/' + colour + '/' + value
  });
}

function pushButton() {
  $.ajax({
    url: url + 'button'
  })
}