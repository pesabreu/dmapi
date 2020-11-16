module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation
    const fetch = require("node-fetch");
   
    const get = async (req, res) => {

        let ingredientes = req.params.ingredientes

    //  await fetch(`https://viacep.com.br/ws/${cep}/json/`)   
    //  http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
        let cep = '70296190'
        await fetch(`http://www.recipepuppy.com/api/?i=onions,garlic`)
            .then(response => {
                // eslint-disable-next-line
                //console.log('Response => ', response)

                response.json()
                    .then(data => {
                        // eslint-disable-next-line
                        console.log('Receitas => ', data)
                        dadosCEP = data

                    })
                    .catch(error => {
                        // eslint-disable-next-line
                        console.log(' Erro Response Receitas ==> ', error)
                    })
                
            })
            .catch(err => {
                // eslint-disable-next-line
                console.log(' Erro Fetch Receitas ==> ', err)
            })  
            
        return true
    }

    return { get }
}
