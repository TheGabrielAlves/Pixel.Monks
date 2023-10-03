function pm(eventObject) {
  function APIMM(url, eventObjectLocal) {
  consolo.log("Deu certo 1")
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



  try {
    var sessionId = 'SE-' + geraIDUnico();

    var hash = geraIDUnico();
   
    sessionStorage.setItem('MMPsessionId', sessionId);
    sessionStorage.setItem('MMhash', hash);
    
    var Tpointer = 'P-' + hash + '-' + Date.now()
  eventObjectLocal = {
   eventName: eventObject.eventName,
   client: eventObject.client,  // definir um codigo unico para o cliente
   sessionId: sessionId,
   deviceId: undefined,
   url: eventObject.url,
   ref: document.referrer,
   pointers: Tpointer,
   params:eventObject.params,
 };}
 catch(e){console.log("DEU ERRO: "+ e)}
 
 //..................................................................
 
 var urlDaAPI = "https://pixel-monks-hg62gkdjeq-rj.a.run.app/hit";

 APIMM(urlDaAPI, eventObjectLocal);

}
