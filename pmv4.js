function pm(eventObject) {

    function APIMM(eventObjectLocal) {
        fetch("https://pixel-monks-hg62gkdjeq-rj.a.run.app/hit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventObjectLocal)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (resultado) {
                console.log(resultado);
            })
            .catch(function (erro) {
                console.error(erro);
            });
    }

    function geraIDUnico() {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        var randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        var timestamp = Date.now().toString(36);
        var parteAleatoria = Math.random().toString(36).substr(2, 5);
        var idUnico = randomLetter + '-' + timestamp + parteAleatoria
        return idUnico;
    }

    function geraIDSessao() {
        var sessionId = 'SE-' + geraIDUnico();
        sessionStorage.setItem('MMPsessionId', sessionId);
        return sessionId;
    }

    function geraPointer() {
        var hash = geraIDUnico();
        var Tpointer = 'P-' + hash + '-' + Date.now();
        sessionStorage.setItem('MMhash', hash);
        return Tpointer;
    }
    function geraDeviceId() {
        var userAgent = navigator.userAgent;
        var operatingSystem = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/i);
        var system = '';
        if (operatingSystem) { system = operatingSystem[0]; }
        else { system = 'desconhecido' }
        var deviceId = 'DE/' + geraIDUnico() + Date.now().toString(36) + '/' + system;
        localStorage.setItem('MMdevice', deviceId);
        return deviceId;
    }

    function ResgataSessao() {
        var sessionId = sessionStorage.getItem('MMPsessionId');
        return sessionId;
    }
    function ResgataPointer() {
        var hash = sessionStorage.getItem('MMhash');
        var Tpointer = 'P-' + hash + '-' + Date.now();
        return Tpointer;
    }

    function ResgataDeviceId() {
        var deviceId = localStorage.getItem('MMdevice');
        return deviceId;
    }

    function Iniciar(eventObject) {

        if (eventObject.event = "purchase") {
            Compra(eventObject)
        }
        else {
            var sessionId = ResgataSessao()
            if (sessionId == null || sessionId == undefined) {
                sessionId = geraIDSessao();
                var pointer = geraPointer();
                eventObjectLocal = {
                    eventName: "session",
                    client: eventObject.client,  // definir um codigo unico para o cliente
                    sessionId: sessionId,
                    deviceId: undefined,
                    url: document.referrer,
                    ref: document.referrer,
                    pointers: pointer,
                    params: eventObject.params,
                };
                APIMM(eventObjectLocal);
                eventObjectLocal = {
                    eventName: "pageview",
                    client: eventObject.client,  // definir um codigo unico para o cliente
                    sessionId: sessionId,
                    deviceId: undefined,
                    url: document.referrer,
                    ref: document.referrer,
                    pointers: pointer,
                    params: eventObject.params,
                };
                APIMM(eventObjectLocal);
            }
            else {
                sessionId = ResgataSessao();
                var pointer = ResgataPointer();
                eventObjectLocal = {
                    eventName: "pageview",
                    client: eventObject.client,  // definir um codigo unico para o cliente
                    sessionId: sessionId,
                    deviceId: undefined,
                    url: document.referrer,
                    ref: document.referrer,
                    pointers: pointer,
                    params: eventObject.params,
                };
                APIMM(eventObjectLocal);

            }
        }
    }

    function Compra(eventObject) {
        var sessionId = ResgataSessao();
        var pointer = ResgataPointer();
        eventObjectLocal = {
            eventName: "purchase",
            client: eventObject.client,  // definir um codigo unico para o cliente
            sessionId: sessionId,
            deviceId: undefined,
            url: document.referrer,
            ref: document.referrer,
            pointers: pointer,
            params: eventObject.params,
        };
        APIMM(eventObjectLocal);

    }

    Iniciar(eventObject)
}
