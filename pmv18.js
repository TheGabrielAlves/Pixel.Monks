function pm(eventObject) {

    function APIMM(eventObjectLocal) {
        fetch("https://project-p-server-hg62gkdjeq-rj.a.run.app/hit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventObjectLocal)
        })
        .then(response => response.json())
        .then(resultado => console.log(resultado))
        .catch(erro => console.error(erro));
    }

    function geraIDUnico() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        const timestamp = Date.now().toString(36);
        const parteAleatoria = Math.random().toString(36).substr(2, 5);
        return randomLetter + '-' + timestamp + parteAleatoria;
    }

    function geraIDSessao() {
        const sessionId = 'SE-' + geraIDUnico();
        sessionStorage.setItem('MMPsessionId', sessionId);
        return sessionId;
    }

    function geraPointer() {
        const hash = geraIDUnico();
        const Tpointer = 'P-' + hash + '-' + Date.now();
        sessionStorage.setItem('MMhash', hash);
        return Tpointer;
    }

    function geraDeviceId() {
        const deviceId = 'DE/' + geraIDUnico() + Date.now().toString(36) + '/' + ResgataSystem();
        localStorage.setItem('MMdevice', deviceId);
        return deviceId;
    }

    function ResgataSystem() {
        const userAgent = navigator.userAgent;
        const operatingSystem = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/i);
        return operatingSystem ? operatingSystem[0] : 'desconhecido';
    }

    function ResgataSessao() {
        return sessionStorage.getItem('MMPsessionId');
    }

    function ResgataPointer() {
        const hash = sessionStorage.getItem('MMhash');
        return 'P-' + hash + '-' + Date.now();
    }

    function ResgataDeviceId() {
        return localStorage.getItem('MMdevice');
    }

    function Iniciar(eventObject) {
        const eventObjectLocal = {
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client_id
        };

        switch(eventObject.type) {
            case "gen":
                gen(eventObject, eventObjectLocal);
                break;
            case "form":
                form(eventObject, eventObjectLocal);
                break;
            case "add_product_list":
                add_product_list(eventObject, eventObjectLocal);
                break;
            case "view_product_list":
                view_product_list(eventObject, eventObjectLocal);
                break;
            case "purchase":
                purchase(eventObject, eventObjectLocal);
                break;
            case "checkout":
                checkout(eventObject, eventObjectLocal);
                break;
            case "remove_product":
                remove_product(eventObject, eventObjectLocal);
                break;
            case "add_product":
                add_product(eventObject, eventObjectLocal);
                break;
            case "view_product":
                view_product(eventObject, eventObjectLocal);
                break;
            case "page_view":
                page_view(eventObject, eventObjectLocal);
                break;
        }
    }

    function page_view(eventObject, eventObjectLocal) {
        let sessionId = ResgataSessao();
        if (!sessionId) {
            sessionId = geraIDSessao();
            const pointer = geraPointer();
            eventObjectLocal.type = "session_start";
            eventObjectLocal.pointer = pointer;
            APIMM(eventObjectLocal);
        }
        eventObjectLocal.type = "page_view";
        eventObjectLocal.session_id = sessionId; // Set sessionId for page_view event
        APIMM(eventObjectLocal);
    }

    function purchase(eventObject, eventObjectLocal) {
        eventObjectLocal.type = "purchase";
        eventObjectLocal.items = eventObject.items;
        eventObjectLocal.total = eventObject.total;
        eventObjectLocal.transaction_id = eventObject.transaction_id;
        console.log(eventObjectLocal);
        APIMM(eventObjectLocal);
    }

    // Remaining functions with similar structure

    Iniciar(eventObject);
}
