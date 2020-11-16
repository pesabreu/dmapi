module.exports = (app) => {
  //carrega funções de validação
  const { existsOrError } = app.api.validation;
  const fetch = require('node-fetch');

  // Inicializa variáveis de trabalho
  var recipes = [];
  var urlGif = '';
  var dados = [];

  const get = async (req, res) => {
    // Guarda parâmetros do url
    let ingredientes = req.query.i;

    try {
      existsOrError(ingredientes, 'Ingrediente(s) não informado(s)');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    // Busca receitas com ingredientes(parâmetros) informados
    await getRecipes(ingredientes);

    try {
      existsOrError(
        recipes,
        'Não existem receitas com o(s) ingrediente(s) informado(s)'
      );
    } catch (msg) {
      return res.status(404).send(msg);
    }

    // Prepara dados para resposta da API
    await getDados();

    let retorno = {
      keywords: ingredientes,
      recipes: dados,
    };

    return res.status(200).json(retorno);
  };
  async function getRecipes(ingredientes) {
    await fetch(`http://www.recipepuppy.com/api/?i=${ingredientes}`)
      .then((response) => {
        // eslint-disable-next-line
        //console.log('Response => ', response)

        return response
          .json()
          .then((data) => {
            recipes = data.results;
          })
          .catch((error) => {
            // Erro na requisição
            return status(400).send(error);
          });
      })
      .catch((err) => {
        // Erro na API
        return status(500).send(err);
      });

    return recipes;
  }

  async function getDados() {
    let dado = [];

    // Varre array de receitas e monta dados da resposta API
    recipes.forEach(async (recipe) => {
      dado = {
        title: recipe.title.trim(),
        ingredients: recipe.ingredients.split(', ').sort(),
        link: recipe.href,
        // recupera link do GIF da receita
        gif: await getGif(recipe.title.trim()),
      };

      // Monta array com os dadosresposta da API
      await mountDados(dado);
      dado = [];
    });

    return dados;
  }

  async function getGif(title) {
    // Recupera Gif animado da cada receita, limita a resposta a uma ocorrência
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=HDH85CZrySh64DZqqu7OoA8f6d7zb83m&q=${title}&limit=1`
    )
      .then((response) => {
        // eslint-disable-next-line
        //console.log('Response GIF => ', response)

        return response
          .json()
          .then((gif) => {
            // Como recupera 1 link apenas, pega o valor pelo índice
            urlGif = gif.data[0].url;
            return urlGif;
          })
          .catch((error) => {
            // Erro na requisição
            return status(400).send(error);
          });
      })
      .catch((err) => {
        // Erro na API
        return status(500).send(err);
      });

    return urlGif;
  }

  async function mountDados(inf) {
    // Guarda receita no array de dados da resposta
    return dados.push(inf);
  }

  return { get };
};
