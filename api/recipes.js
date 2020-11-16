module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation;
    const fetch = require("node-fetch");
    var recipes = []
    var urlGif = ''
    var dados = []
   
    const get = async (req, res) => {

        let ingredientes = req.params.ingredientes
        // eslint-disable-next-line
        //console.log('ingredientes => ', ingredientes)
        
        try {
            existsOrError(ingredientes, 'Ingrediente(s) não informado(s)')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        await getRecipes(ingredientes)
        // eslint-disable-next-line
        //console.log('Receitas => ', recipes)
        
        try {
            existsOrError(recipes, 'Não existem receitas com o(s) ingrediente(s) informado(s)')
        } catch(msg) {
            return res.status(404).send(msg)
        }
        
        await getDados()
        
        let ret = {
            keywords: ingredientes,
            recipes: dados
        }
        console.log('Dados Receitas => ', ret)
        
        return res.status(200).json(ret)
    }

    async function getRecipes(ingredientes) {
    //  http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

        await fetch(`http://www.recipepuppy.com/api/?i=${ingredientes}`)
            .then(response => {
                // eslint-disable-next-line
                //console.log('Response => ', response)

               return response.json()
                    .then(data => {
                        recipes = data.results
                        // eslint-disable-next-line
                        //console.log('Receitas Fetch => ', recipes)
                        //return recipes
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
        return recipes
    }
    
    async function getDados() {
        let dado = []
        //console.log('Dados GET => ', recipes.length)
        
        recipes.forEach(async recipe => {
            dado = {
                title: recipe.title.trim(),
                ingredients: recipe.ingredients.split(', ').sort(),
                link: recipe.href,
                gif: await getGif(recipe.title.trim())
            }
            
            await mountDados(dado)
            //console.log('Dados GET => ', dados)
            dado = []
        });
        
        return dados
    }
 
    async function getGif(title) {
        //console.log('Dados getGif => ', title)

        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=HDH85CZrySh64DZqqu7OoA8f6d7zb83m&q=${title}&limit=1`)
            .then(response => {
                // eslint-disable-next-line
                //console.log('Response GIF => ', response)

               return response.json()
                    .then(gif => {
                        urlGif = gif.data[0].url
                        // eslint-disable-next-line
                        //console.log('Link GIFFF => ', urlGif)
                        return urlGif
                    })
                    .catch(error => {
                        // eslint-disable-next-line
                        console.log(' Erro Response GIF ==> ', error)
                    })                
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.log(' Erro Fetch GIF ==> ', err)
                })
                
        //console.log('GIF Return => ', rec.length)
        return urlGif       
    }

    async function mountDados(inf) {
        //console.log('Dados Mount => ', inf)
        return dados.push(inf)
    }

    return { get }
}
