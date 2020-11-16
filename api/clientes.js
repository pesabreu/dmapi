module.exports = app => {

    const codEmpresa = 1
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const cliente = { ...req.body }

        //console.log(cliente)
        if(req.params.id) cliente.codigopessoa = req.params.id

        try {
            existsOrError(cliente.razaosocialpessoa, 'Nome não informado')
            existsOrError(cliente.cpfcnpjpessoa, 'CPF não informado')

            const clienteFromDB = await app.db('tbpessoas')
                .where({ razaosocialpessoa: cliente.razaosocialpessoa, cpfcnpjpessoa: cliente.cpfcnpjpessoa })
                .first()
                .then()
                .catch(err => res.status(500).send(err))

            if(!cliente.codigopessoa) {
                notExistsOrError(clienteFromDB, 'Cliente já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(cliente.codigopessoa) {
          await app.db('tbpessoas')
                .update(cliente)
                .where({ codigopessoa: cliente.codigopessoa })
                .where('tbpessoas.status', '01')
                .then(result => res.json(result).status(200).send())
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbpessoas')
                .insert(cliente)
                .then(result => res.json(result).status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const savePDV = async (req, res) => {
        const cliente = { ...req.body }

        //console.log(cliente)
        if(req.params.id) cliente.codigopessoa = req.params.id

        try {
            existsOrError(cliente.razaosocialpessoa, 'Nome não informado')
            existsOrError(cliente.cpfcnpjpessoa, 'CPF não informado')

            const clienteFromDB = await app.db('tbpessoas')
                .where({ razaosocialpessoa: cliente.razaosocialpessoa, cpfcnpjpessoa: cliente.cpfcnpjpessoa })
                .first()
                .then()
                .catch(err => res.status(500).send(err))

            if(!cliente.codigopessoa) {
                notExistsOrError(clienteFromDB, 'Cliente já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        var dadosCliente = {}

        if(cliente.codigopessoa) {
            await app.db('tbpessoas')
            .update(cliente, "codigopessoa")
            .where({ codigopessoa: cliente.codigopessoa })
            .where('tbpessoas.status', '01')
            //.then(result => res.json(result).status(200).send())
            .then(result => dadosCliente = result)
            .catch(err => res.status(500).send(err))
        } else {
            await app.db('tbpessoas')
            .insert(cliente, "codigopessoa")
            .then(result => res.json(result).status(201).send())
            .catch(err => res.status(500).send(err))
        }
        
        if(!cliente.codigopessoa) {
            var empresaCliente = {
                codigoempresacliente: codEmpresa,
                codigopessoacliente: dadosCliente.codigopessoa
            }

            await app.db('tbempresaclientes')
              .insert(empresaCliente, "codigoempresacliente")
              .then(result => res.json(result).status(201).send())
              .catch(err => res.status(500).send(err))
        }
    }

    const saveEmpresaCliente = async (req, res) => {
        const empresaCliente = { ...req.body }

         //console.log(empresaCliente)
        if (req.params.id) empresaCliente.codigoempresacliente = req.params.id

        try {
            existsOrError(empresaCliente.codigopessoaempresa, 'Empresa/Posto não informado')
            existsOrError(empresaCliente.codigopessoacliente, 'Responsável não informado')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if (empresaCliente.codigoempresacliente) {
          await app.db('tbempresaclientes')
                .update(empresaCliente, "codigoempresacliente")
                .where({
                    codigoempresacliente: empresaCliente.codigoempresacliente
                })
                .where('tbempresaclientes.status', '01')
                .then(result => res.json(result).status(200).send())
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbempresaclientes')
                .insert(empresaCliente, "codigoempresacliente")
                .then(result => res.json(result).status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const saveComercial = async (req, res) => {
        const comercial = { ...req.body }
        //console.log(cliente)
        if (req.params.id) comercial.codigoinfcomercial = req.params.id

        try {
            existsOrError(comercial.codigopessoacliente, 'Responsável não informado')

            const comercialFromDB = await app.db('tbclienteinfcomerciais')
                .where({ codigopessoacliente: comercial.codigopessoacliente }).first()
                .then()
                .catch(err => res.status(500).send(err))

            if(!comercial.codigoinfcomercial) {
                notExistsOrError(comercialFromDB, 'Inf. Comerciais já cadastradas')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(comercial.codigoinfcomercial) {
          await app.db('tbclienteinfcomerciais')
                .update(comercial, "codigoinfcomercial")
                .where({ codigoinfcomercial: comercial.codigoinfcomercial })
                .where('tbclienteinfcomerciais.status', '01')
                .then(result => res.json(result).status(200).send())
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbclienteinfcomerciais')
                .insert(comercial, "codigoinfcomercial")
                .then(result => res.json(result).status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const saveComplementar = async (req, res) => {
        const complementar = { ...req.body }
        //console.log(cliente)
        if (req.params.id) complementar.codigopessoacliente = req.params.id

        try {
            existsOrError(complementar.codigopessoacliente, 'Responsável não informado')

            const complementarFromDB = await app.db('tbclienteinfcomplementares')
                .where({ codigopessoacliente: complementar.codigopessoacliente }).first()
                .then()
                .catch(err => res.status(500).send(err))

            if(!complementar.codigoinfcomplementares) {
                notExistsOrError(complementarFromDB, 'Inf. Complementares já cadastradas')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(complementar.codigoinfcomplementares) {
          await app.db('tbclienteinfcomplementares')
                .update(complementar, "codigoinfcomplementares")
                .where({ codigoinfcomplementares: complementar.codigoinfcomplementares })
                .where('tbclienteinfcomplementares.status', '01')
                .then(result => res.json(result).status(200).send())
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbclienteinfcomplementares')
                .insert(complementar, "codigoinfcomplementares")
                .then(result => res.json(result).status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const saveVeiculo = async (req, res) => {
        const veiculo = { ...req.body }
        //console.log(cliente)
        if (req.params.id) veiculo.codigopessoacliente = req.params.id

        try {
            existsOrError(veiculo.codigopessoacliente, 'Responsável não informado')

            const veiculoFromDB = await app.db('tbclientefrotaveiculos')
                .where({ codigopessoacliente: veiculo.codigopessoacliente }).first()
                .then()
                .catch(err => res.status(500).send(err))

            if(!veiculo.codigofrotaveiculo) {
                notExistsOrError(veiculoFromDB, 'Veículo Frota já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(veiculo.codigofrotaveiculo) {
          await app.db('tbclientefrotaveiculos')
                .update(veiculo, "codigofrotaveiculo")
                .where({ codigofrotaveiculo: veiculo.codigofrotaveiculo })
                .where('tbclientefrotaveiculos.status', '01')
                .then(result => res.json(result).status(200).send())
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbclientefrotaveiculos')
                .insert(veiculo, "codigofrotaveiculo")
                .then(result => res.json(result).status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const saveMotorista = async (req, res) => {
        const motorista = { ...req.body }
        //console.log(cliente)
        if (req.params.id) motorista.codigofrotaveiculo = req.params.id

        try {
            existsOrError(motorista.codigofrotaveiculo, 'Veículo Frota não informado')

            const motoristaFromDB = await app.db('tbclientefrotamotoristas')
                .where({ codigofrotaveiculo: motorista.codigofrotaveiculo }).first()
                .then()
                .catch(err => res.status(500).send(err))

            if(!motorista.codigofrotamotorista) {
                notExistsOrError(motoristaFromDB, 'Motorista Frota já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(motorista.codigofrotamotorista) {
          await app.db('tbclientefrotamotoristas')
                .update(motorista, "codigofrotamotorista")
                .where({ codigofrotamotorista: motorista.codigofrotamotorista })
                .where('tbclientefrotamotoristas.status', '01')
                .then(result => res.json(result).status(200).send())
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbclientefrotamotoristas')
                .insert(motorista, "codigofrotamotorista")
                .then(result => res.json(result).status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {

        let codEmp = req.params.empr ? req.params.empr : 1
//        console.log('Empresa Cli ==> ', codEmp)

      await app.db('tbempresaclientes')
            .select('tbpessoas.*', 'tbenderecos.*', 'tbcontatos.*', 'tbclienteinfcomerciais.*', 'tbclienteinfcomplementares.*', 'tbempresaclientes.*'
            //, 'tbclientefrotaveiculos.*', 'tbclientefrotamotoristas.*'
            )
            //.limit(10)
            .innerJoin('tbpessoas', 'tbpessoas.codigopessoa', 'tbempresaclientes.codigopessoacliente')
            .leftJoin('tbclienteinfcomerciais', 'tbpessoas.codigopessoa', 'tbclienteinfcomerciais.codigopessoacliente')
            .leftJoin('tbclienteinfcomplementares', 'tbpessoas.codigopessoa', 'tbclienteinfcomplementares.codigopessoacliente')
            .leftJoin('tbclientefrotaveiculos', 'tbpessoas.codigopessoa', 'tbclientefrotaveiculos.codigopessoacliente')
            .leftJoin('tbclientefrotamotoristas', 'tbclientefrotaveiculos.codigofrotaveiculo', 'tbclientefrotamotoristas.codigofrotaveiculo')
            .leftJoin('tbenderecos', 'tbpessoas.codigopessoa', 'tbenderecos.codigopessoaendereco')
            .leftJoin('tbcontatos', 'tbpessoas.codigopessoa', 'tbcontatos.codigopessoacontato')
            //.where('tbpessoas.tiporelacionamentopessoa', 4)
            .where('tbempresaclientes.codigopessoaempresa', codEmp)
            .where('tbempresaclientes.status', '01')
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
      await app.db('tbpessoas')
            .select('codigopessoa', 'razaosocialpessoa', 'cpfcnpjpessoa', 'nomefantasiapessoa')
            .where({ codigopessoa: req.params.id })
            .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
         try {
             const rowsClienteDeleted = await app.db('tbpessoas')
                 .where({ codigocliente: req.params.id }).del()
             try {
                 existsOrError(rowsClienteDeleted, 'Cliente não foi encontrado !')
             }
             catch (msg) {
                 return res.status(400).send(msg)
             }
                const rowsEnderecoDeleted = await app.db('tbenderecos')
                    .where({ codigopessoaendereco: req.params.id }).del()
                try {
                    existsOrError(rowsEnderecoDeleted, 'Endereço Cliente não encontrado !')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

                const rowsContatoDeleted = await app.db('tbcontatos')
                    .where({ codigopessoacontato: req.params.id }).del()
                try {
                    existsOrError(rowsContatoDeleted, 'Contato Empresa não encontrado !')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

                const rowsComercialDeleted = await app.db('tbclienteinfcomerciais')
                    .where({ codigopessoacliente: req.params.id }).del()
                try {
                    existsOrError(rowsComercialDeleted, 'Inf. Comercial Empresa não encontrado !')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

                const rowsComplementarDeleted = await app.db('tbclienteinfcomplementares')
                    .where({ codigopessoacliente: req.params.id }).del()
                try {
                    existsOrError(rowsComplementarDeleted, 'Inf. Complementar Empresa não encontrado !')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

                const rowsVeiculoDeleted = await app.db('tbclientefrotaveiculos')
                    .where({ codigopessoacliente: req.params.id }).del()
                try {
                    existsOrError(rowsVeiculoDeleted, 'Frota Veículo Empresa não encontrado !')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

                const rowsMotoristaDeleted = await app.db('tbclientefrotamotoristas')
                    .where({ codigopessoacliente: req.params.id }).del()
                try {
                    existsOrError(rowsMotoristaDeleted, 'Frota Motorista Empresa não encontrado !')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

           // return res.status(204).send()
     } catch (msg) {
         return res.status(500).send(msg)
     }
     return res.status(204).send()
 }

    return { save, savePDV, get, getById, remove, saveEmpresaCliente, 
                saveComercial, saveComplementar, saveVeiculo, saveMotorista }
}
