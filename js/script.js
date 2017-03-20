var url = document.URL;

includeHtml();

function includeHtml() {
    var list = $('[w3-include-html]'),
        elmnt,
        xhttp;

    if (list.length) {
        elmnt = list[0];
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                elmnt.innerHTML = this.responseText;
                elmnt.removeAttribute("w3-include-html");
                includeHtml();
            }
        };
        xhttp.open("GET", elmnt.getAttribute("w3-include-html"), true);
        xhttp.send();
    } else {
        generateView();
    }
}

function generateView() {
    Vue.component('login-form', {
        props: ['todo'],
        template: '#login-form-template'
    });

    new Vue({
        el: "#app",
        data: {
            groceryList: [
                { text: 'Vegetables' },
                { text: 'Cheese' },
                { text: 'Whatever else humans are supposed to eat' }
            ]
        }
    });
}

if (/localhost/.test(document.URL)) {
    url = 'http://192.168.1.109:3000/'
}

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
    console.log(url);
  $.ajax({
    url: url + 'led/' + colour + '/' + value
  });
}

function pushButton() {
  $.ajax({
    url: url + 'button'
  })
}