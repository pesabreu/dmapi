module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation;
    const fetch = require("node-fetch");
    var recipes = []
    var urlGif = ''
    var dados = []
   
    const get = async (req, res) => {

        let ingredientes = req.params.ingredientes
        
        try {
            existsOrError(ingredientes, 'Ingrediente(s) não informado(s)')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        await getRecipes(ingredientes)
        
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
        
        return res.status(200).json(ret)
    }

    async function getRecipes(ingredientes) {

        await fetch(`http://www.recipepuppy.com/api/?i=${ingredientes}`)
            .then(response => {
               // eslint-disable-next-line
               //console.log('Response => ', response)

               return response.json()
                    .then(data => {
                        recipes = data.results
                    })
                    .catch(error => {
                        return res.status(400).send(error)
                    })                
                })
                .catch(err => {
                    return res.status(500).send(error)
                })

        return recipes
    }
    
    async function getDados() {
        let dado = []
        
        recipes.forEach(async recipe => {
            dado = {
                title: recipe.title.trim(),
                ingredients: recipe.ingredients.split(', ').sort(),
                link: recipe.href,
                gif: await getGif(recipe.title.trim())
            }
            
            await mountDados(dado)
            dado = []
        });
        
        return dados
    }
 
    async function getGif(title) {

        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=HDH85CZrySh64DZqqu7OoA8f6d7zb83m&q=${title}&limit=1`)
            .then(response => {
               // eslint-disable-next-line
               //console.log('Response GIF => ', response)

               return response.json()
                    .then(gif => {
                        urlGif = gif.data[0].url
                        return urlGif
                    })
                    .catch(error => {
                        return res.status(400).send(error)
                    })                
                })
                .catch(err => {
                    return res.status(500).send(error)
                })
                
        return urlGif       
    }

    async function mountDados(inf) {
        return dados.push(inf)
    }

    return { get }
}
