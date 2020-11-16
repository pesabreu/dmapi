
module.exports = app => {

    // endpoints
    // Receitas
    app.route('/recipes/:ingredientes')
        .get(app.api.recipes.get)

}
