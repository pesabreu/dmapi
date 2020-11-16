
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const funcao = { ...req.body }

        if(req.params.id) funcao.codigofuncao = req.params.id

        try {
            existsOrError(funcao.nomefuncao, 'Nome não informado')
            existsOrError(funcao.siglafuncao, 'Sigla não informada')

            const funcaoFromDB = await app.db('tbfuncoes')
                .where({ 
                    nomefuncao: funcao.nomefuncao, 
                    siglafuncao: funcao.siglafuncao 
                }).first()
                .where('tbfuncoes.status', '01')
            
            if (!funcao.codigofuncao) {
                notExistsOrError(funcaoFromDB, 'Função já cadastrada')
            }

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if (funcao.codigofuncao) {
            app.db('tbfuncoes')
                .update(funcao)
                .where({ codigofuncao: funcao.codigofuncao })
                .where('tbfuncoes.status', '01')
                .then(_ => {
                    res.status(204).send()
                })
                .catch(err => res.status(500).send(err))
        } else {
            app.db('tbfuncoes')
                .insert(funcao)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('tbfuncoes')
/*            .select('codigofuncao', 'nomefuncao', 'siglafuncao', 'descricaofuncao', 'subgrupofuncao', 'subgrupofuncao', 'observacoes', 'status')*/
            .where('tbfuncoes.status', '01')
            .then(funcoes => res.json(funcoes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('tbfuncoes')
            .where({ codigofuncao: req.params.id })
            .first()
            .then(funcao => res.json(funcao))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('tbfuncoes')
                .where({ codigofuncao: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Função não foi encontrada !')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}