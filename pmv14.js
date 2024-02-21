function pm(eventObject) {

    function APIMM(eventObjectLocal) {
        fetch("https://project-p-server-hg62gkdjeq-rj.a.run.app/hit", {
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
        
        var deviceId = 'DE/' + geraIDUnico() + Date.now().toString(36) + '/' + ResgataSystem();
        localStorage.setItem('MMdevice', deviceId);
        return deviceId;
    }
    function ResgataSystem()
    {
        var userAgent = navigator.userAgent;
        var operatingSystem = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/i);
        var system = '';
        if (operatingSystem) { system = operatingSystem[0]; }
        else { system = 'desconhecido' }
        return system;

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

        
        if (eventObject.type == "gen") 
        {
            gen(eventObject)
        }
        if (eventObject.type == "form") 
        {
            form(eventObject)
        }
        if (eventObject.type == "add_product_list") 
        {
            add_product_list(eventObject)
        }
        if (eventObject.type == "view_product_list") 
        {
            view_product_list(eventObject)
        }
        if (eventObject.type == "purchase") 
        {
            purchase(eventObject)
        }
        if (eventObject.type == "checkout") 
        {
            checkout(eventObject)
        }
        if (eventObject.type == "remove_product") 
        {
            remove_product(eventObject)
        }
        if (eventObject.type == "add_product") 
        {
            add_product(eventObject)
        }
        if (eventObject.type == "view_product") 
        {
            view_product(eventObject)
        }
        if (eventObject.type == "page_view") 
        {
            var sessionId = ResgataSessao()
            if (sessionId == null || sessionId == undefined) {
                sessionId = geraIDSessao();
                var pointer = geraPointer();
                eventObjectLocal = {
                    type: "session_start",
                    timestamp: Date.now(),
                    session_id: sessionId,
                    system: ResgataSystem(),
                    url: document.URL,
                    ref: document.referrer,
                    pointer: pointer,
                    client_id: eventObject.client
                };
                APIMM(eventObjectLocal);
                eventObjectLocal = {
                    type: "page_view",
                    timestamp: Date.now(),
                    session_id: sessionId,
                    system: ResgataSystem(),
                    url: document.URL,
                    ref: document.referrer,
                    pointer: pointer,
                    client_id: eventObject.client
                };
                APIMM(eventObjectLocal);
            }
            else {
                sessionId = ResgataSessao();
                var pointer = ResgataPointer();
                eventObjectLocal = {
                    type: "page_view",
                    timestamp: Date.now(),
                    session_id: sessionId,
                    system: ResgataSystem(),
                    url: document.URL,
                    ref: document.referrer,
                    pointer: pointer,
                    client_id: eventObject.client
                    
                };
                APIMM(eventObjectLocal);

            }
           
        }

    }

    function purchase(eventObject) 
    {
        eventObjectLocal = {
            type: "purchase",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items,
            total: eventObject.total,
            transaction_id: eventObject.transaction_id
        };
        APIMM(eventObjectLocal);
    }

    function checkout(eventObject) 
    {
        eventObjectLocal = {
            type: "checkout",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items,
            total: eventObject.total
        };
        APIMM(eventObjectLocal);
    }

    function view_product(eventObject) 
    {
        eventObjectLocal = {
            type: "view_product",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items
        };
        APIMM(eventObjectLocal);
    }

    function add_product(eventObject) 
    {
        eventObjectLocal = {
            type: "add_product",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items
        };
        APIMM(eventObjectLocal);
    }

    function remove_product(eventObject) 
    {
        eventObjectLocal = {
            type: "remove_product",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items
        };
        APIMM(eventObjectLocal);
    }

    function view_product_list(eventObject) 
    {
        eventObjectLocal = {
            type: "view_product_list",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items,
            list:eventObject.list,
            index:eventObject.index,
        };
        APIMM(eventObjectLocal);
    }

    function add_product_list(eventObject) 
    {
        eventObjectLocal = {
            type: "add_product_list",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            items: eventObject.items,
            list:eventObject.list,
            index:eventObject.index,
        };
        APIMM(eventObjectLocal);
    }

    function form(eventObject) 
    {
        eventObjectLocal = {
            type: "form",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            p1: eventObject.p1,
            p2: eventObject.p2,
            p_value: eventObject.p_value
        
        };
        APIMM(eventObjectLocal);
    }

    function gen(eventObject) 
    {
        eventObjectLocal = {
            type: "gen",
            timestamp: Date.now(),
            session_id: ResgataSessao(),
            system: ResgataSystem(),
            url: document.URL,
            ref: document.referrer,
            pointer: ResgataPointer(),
            client_id: eventObject.client,
            p1: eventObject.p1,
            p2: eventObject.p2,
            p3: eventObject.p3,
            p4: eventObject.p4,
            p5: eventObject.p5,
            p_value: eventObject.p_value
        };
        APIMM(eventObjectLocal);
    }

    Iniciar(eventObject)
}
