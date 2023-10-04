function pm(eventObject) {
    function APIMM(eventObjectLocal) {
        return fetch("https://pixel-monks-hg62gkdjeq-rj.a.run.app/hit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventObjectLocal)
        })
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado);
        })
        .catch(erro => {
            console.error(erro);
        });
    }

    function geraIDUnico() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        const timestamp = Date.now().toString(36);
        const parteAleatoria = Math.random().toString(36).substr(2, 5);
        const idUnico = `${randomLetter}-${timestamp}${parteAleatoria}`;
        return idUnico;
    }

    function geraIDSessao() {
        const sessionId = `SE-${geraIDUnico()}`;
        sessionStorage.setItem('MMPsessionId', sessionId);
        return sessionId;
    }

    function geraPointer() {
        const hash = geraIDUnico();
        const Tpointer = `P-${hash}-${Date.now()}`;
        sessionStorage.setItem('MMhash', hash);
        return Tpointer;
    }

    function geraDeviceId() {
        const userAgent = navigator.userAgent;
        const operatingSystem = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/i);
        const system = operatingSystem ? operatingSystem[0] : 'desconhecido';
        const deviceId = `DE/${geraIDUnico()}${Date.now().toString(36)}/${system}`;
        localStorage.setItem('MMdevice', deviceId);
        return deviceId;
    }

    function ResgataSessao() {
        return sessionStorage.getItem('MMPsessionId');
    }

    function ResgataPointer() {
        const hash = sessionStorage.getItem('MMhash');
        const Tpointer = `P-${hash}-${Date.now()}`;
        return Tpointer;
    }

    function ResgataDeviceId() {
        return localStorage.getItem('MMdevice');
    }

    function Iniciar(eventObject) {
        let sessionId = ResgataSessao();
        let pointer;
        let eventObjectLocal;
        if (!sessionId) {
            sessionId = geraIDSessao();
            pointer = geraPointer();
            eventObjectLocal = {
                eventName: "session",
                client: eventObject.client,
                sessionId: sessionId,
                deviceId: undefined,
                url: document.referrer,
                ref: document.referrer,
                pointers: pointer,
                params: eventObject.params,
            };
            APIMM(eventObjectLocal);
            eventObjectLocal.eventName = "pageview";
            APIMM(eventObjectLocal);
        } else {
            sessionId = ResgataSessao();
            pointer = ResgataPointer();
            eventObjectLocal = {
                eventName: "pageview",
                client: eventObject.client,
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

    Iniciar(eventObject);
}
