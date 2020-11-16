const request = require('supertest')
const app = require('./server')

describe('Teste unitário de rotas', () => {
    it('Testar a rota principal', async () => {
        const res = await request(app)
            .get('/recipes/onions,garlic,nut')

        expect(res.body).toHaveProperty('keywords')
        expect(res.body).toHaveProperty('recipes')
    })
})

app.listen(3636, () => {
    console.log('API em Operação.....')
})
