function pm(eventObject) {
    var urlDaAPI = "https://pixel-monks-hg62gkdjeq-rj.a.run.app/hit";
    function APIMM(url, eventObjectLocal) {
        fetch(url, {
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

    //Gera o session id.................................................
    function geraIDUnico() {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        var randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        var timestamp = Date.now().toString(36);
        var parteAleatoria = Math.random().toString(36).substr(2, 5);
        var idUnico = randomLetter + '-' + timestamp + parteAleatoria
        return idUnico;
    }

    

    //..................................................................

    var SitesessionId = sessionStorage.getItem('MMPsessionId');
    if(SitesessionId == null || SitesessionId == undefined)
    {
        try {
            var Event = 'session';
            var sessionId = 'SE-' + geraIDUnico();
            var hash = geraIDUnico();
            sessionStorage.setItem('MMPsessionId', sessionId);
            sessionStorage.setItem('MMhash', hash);
            var Tpointer = 'P-' + hash + '-' + Date.now()
            eventObjectLocal = {
                eventName: Event,
                client: eventObject.client,  // definir um codigo unico para o cliente
                sessionId: sessionId,
                deviceId: undefined,
                url: document.referrer,
                ref: document.referrer,
                pointers: Tpointer,
                params: eventObject.params,
            };
        }
        catch (e) { console.log("Erro: " + e) } 
        APIMM(urlDaAPI, eventObjectLocal);
        eventObjectLocal = {
            eventName: 'pageview',
            client: eventObject.client,  // definir um codigo unico para o cliente
            sessionId: SitesessionId,
            deviceId: undefined,
            url: document.referrer,
            ref: document.referrer,
            pointers: 'P-' + hash + '-' + Date.now(),
            params: eventObject.params,
        };
        APIMM(urlDaAPI, eventObjectLocal);
}
    else {
        eventObjectLocal = {
            eventName: 'pageview',
            client: eventObject.client,  // definir um codigo unico para o cliente
            sessionId: SitesessionId,
            deviceId: undefined,
            url: document.referrer,
            ref: document.referrer,
            pointers: Tpointer,
            params: eventObject.params,
        };
        APIMM(urlDaAPI, eventObjectLocal);
    
    }


}
