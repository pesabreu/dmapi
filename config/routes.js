
module.exports = app => {

    // endpoints
    // Receitas
    app.route('/recipes')
        .get(app.api.recipes.get)
}
