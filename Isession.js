function pm(eventObject) {
    (function () {
    console.log('Chamou o GIT')
      function APIMM(url, parametros) {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(parametros)
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
        // Código para geração do ID único
        // ...
      }
  
      var sessionId = 'SE-' + geraIDUnico();
      var hash = geraIDUnico();
    
      sessionStorage.setItem('MMPsessionId', sessionId);
      sessionStorage.setItem('MMhash', hash);
      
      var Tpointer = 'P-' + hash + '-' + Date.now()
  
      var urlDaAPI = "https://pixel-monks-hg62gkdjeq-rj.a.run.app/hit";
      var parametros = {
        method: 'POST',
        body: JSON.stringify(eventObject)
      };
  
      APIMM(urlDaAPI, eventObject);
    })();
  }
