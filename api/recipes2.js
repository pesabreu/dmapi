module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation;
    const fetch = require("node-fetch");
    //var recipes = [];
   
    const get = async (req, res) => {

        let ingredientes = req.params.ingredientes
        //console.log('ingredientesss => ', ingredientes)
        
        try {
            existsOrError(ingredientes, 'Ingrediente(s) não informado(s)')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        let recip = await recipes(ingredientes) // getRecipes(ingredientes)
            .then( volta => {

                console.log('receitas volta => ', volta)
            })

        try {
            existsOrError(this.recipes, 'Não existem receitas com o(s) ingrediente(s) informado(s)')
        } catch(msg) {
            return res.status(404).send(msg)
        }

       // let dados = getDados(recipes)
        return res.status(200).json(this.recipes)
    }

    const recipes = async (req, resp) => {

        var volta = []
    //  let cep = '70296190'
    //  await fetch(`https://viacep.com.br/ws/${cep}/json/`)   
    //  http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
    //  api.giphy.com/v1/gifs/{gif_id}


    console.log('req => ', req)
    //console.log('res => ', res)

        await fetch(`http://www.recipepuppy.com/api/?i=onions,garlic`)
            .then(response => {
                // eslint-disable-next-line
                //console.log('Response => ', response)

                response.json()
                    .then(data => {
                        // eslint-disable-next-line
                        //res.json(data)
                        volta = data.results
                        console.log('Receitas Fetch => ', volta)
                        return data
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
                
        //console.log('Receitas Return => ', recipes.length)
        return resp.json(volta)
    }
    
    async function getDados(recipes) {
        let dados = []

        recipes.forEach(recipe => {
            
        });
    }

    return { get }
}
