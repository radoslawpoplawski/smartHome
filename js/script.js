var url = document.URL;

includeHtml();

function includeHtml() {
    var list = $('[include-html]'),
        elmnt = null;

    if (list.length) {
        elmnt = list[0];
        var total = list.length;
        var include = $(elmnt).attr("include-html");

        $(elmnt).removeAttr("include-html");
        $(elmnt).load(include, function() {
            if (total === 1) {
                generateView();
            }
        });
        if (total > 1) {
            includeHtml();
        }
    } else {
        generateView();
    }
}

function generateView() {
    var app = new Vue({
        el: "#app",
        data: {
            user: {}
        },
        methods: {
            isUserLogged: function () {
                return _.size(this.user) > 0;
            }
        }
    });
}

if (/localhost/.test(document.URL)) {
    url = 'http://192.168.1.109:3000/'
}

if ("WebSocket" in window) {
    var ws = new WebSocket("ws://192.168.1.109:8080", "echo-protocol");

    ws.onopen = function () {
        console.info('Połączenie WebSocket z 192.168.1.109');
    };

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);

        switchRed.model = data.led.red.value;
        switchYellow.model = data.led.yellow.value;
        switchGreen.model = data.led.green.value;
        console.log(mainBox);
    };

    ws.onclose = function () {
        console.info('Połączenie WebSocket zostało zerwane');
    };
}