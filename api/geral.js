const { rejects } = require('assert')
const { resolve } = require('path')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const saveEndereco = async (req, res) => {
        const endereco = { ...req.body }
        //console.log(endereco)
        //if (req.params.id) endereco.codigopessoaendereco = req.params.id

        try {
            existsOrError(endereco.codigopessoaendereco, 'Responsável Endereço não informado')
            existsOrError(endereco.cependereco, 'CEP não informado')
            existsOrError(endereco.logradouroendereco, 'Logradouro não informado')
            existsOrError(endereco.bairroendereco, 'Bairro não informado')
            existsOrError(endereco.numeroendereco, 'Número não informado')
            existsOrError(endereco.municipioendereco, 'Município não informado')
            existsOrError(endereco.ufendereco, 'UF não informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if (endereco.codigoendereco) {
          await app.db('tbenderecos')
                .update(endereco)
                .where({ codigoendereco: endereco.codigoendereco })
                .where('tbenderecos.status', '01')
                .then(_ => {
                    res.status(204).send()
                })
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbenderecos')
                .insert(endereco)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const saveContato = async (req, res) => {
        const contato = { ...req.body }
        //if (req.params.id) contato.codigopessoacontato = req.params.id

        try {
            existsOrError(contato.codigopessoacontato, 'Responsável Contato não informado')
          //  existsOrError(contato.nomepessoacontato, 'Nome não informado')
          //  existsOrError(contato.emailcontato, 'E-mail não informado')
           // existsOrError(contato.telefonecelular1contato, 'Telefone Celular não informado')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (contato.codigocontato) {
            //console.log('data aniv => ' + contato.dtaniversariocontato)
          await app.db('tbcontatos')
                .update(contato)
                .where({
                    codigocontato: contato.codigocontato
                })
                .where('tbcontatos.status', '01')
                .then(_ => {
                   return res.status(202).send()
                })
                .catch(err => res.status(500).send(err))
        } else {
          await app.db('tbcontatos')
                .insert(contato)
                .then(_ => {return res.status(204).send()})
                .catch(err => res.status(500).send(err))
        }
    }
    const getMaxId = async (req, res) => {
        //console.log('parametro => ' + req.params.key)

        var parms = []
        parms = req.params.key.split(',')
        var tab = parms[0]
        var max = parms[1] + ' as maxid'

        await app.db(`${tab}`)
        .max(`${max}`)
        .first()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
    }

    const getCestNcmSh = (req, res) => {
        app.db('tbcestncmsh')
            .where('tbcestncmsh.status', '01')
            .then(cestncmsh => res.json(cestncmsh))
            .catch(err => res.status(500).send(err))
    }

    const getByIdCestNcmSh = (req, res) => {
        app.db('tbcestncmsh')
            .where({
                codigocestncmsh: req.params.id
            })
            .first()
            .then(cestncmsh => res.json(cestncmsh))
            .catch(err => res.status(500).send(err))
    }
    
    const uploadDocs = async function (req, res) {

        var pastaPublica = './../public/arquivos/'
        var multer = require('multer');
        var path = require('path')
        
        try {
            var storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, pastaPublica)
                },
                filename: (req, file, cb) => {
                   //cb(null, file.fieldname + '-' + Date.now())
                   // let nomeArquivo = `${dadosArquivos.nome}_${dadosArquivos.cpfcnpj}_${Date.now()}${path.extname(file.originalname)}`
                   
                    let nomeArquivo =
                        `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
                    
                    req.body.caminho = pastaPublica + nomeArquivo;
                    cb(null, nomeArquivo)
                }
            })
        }
        catch (error) {
            console.log( 'Erro uploadDocs => ', error )
        }
       // console.log('caminho => ', nomeArquivo)

        const upload = multer({
                storage: storage
              })
              .fields([{
                name: 'file',
                maxCount: 1
              }])        
        try {            
            upload( req, res, async err =>  {
                if (!err) {
                    console.log('Ok do upload !!!')
                    // Quando o código chegar aqui é porque seu arquivo já 
                    // foi salvo no disco. Agora você pode continuar com seu processamento
                    // lendo os demais campos postados
                    // Demais campos postados:
                    const dadosArquivo = req.body
                    // eslint-disable-next-line
                    console.log('Body => ', dadosArquivo)
                    salvaDocs(dadosArquivo)
                    // (...)
                    //const nome = req.body.file; // Valor 'teste' neste exemplo
                    //let nomeEmpresa = dadosArquivos.nomeempresa
                    //console.log('nome => ', req.body.file)
                    
                    return res.status(203).send(res.json(
                        req.body.file
                    ))
                } else {
                    // eslint-disable-next-line
                    console.log( 'Erro no Upload => ', err )
                    return res.status(400).send('Erro no Upload !')
                }                
            })

        } catch (error) {
            // eslint-disable-next-line
            console.log('Erro no Try Upload => ', error)
        }

	}
    
    function salvaDocs(dados) {
        var dadosDocs = {
            codigopessoadocumento: '',
            arquivorgdocumento: '',
            arquivocpfdocumento: '',
            arquivoctrabdocumento: '',
            arquivocresdocumento: '',
            arquivofotodocumento: '',
            pastaarquivodocumento: 'public/arquivos/'
        }

        const docsFromDB = app.db('tbarquivodocumentos')
            .where({
                codigopessoadocumento: dados.codigopessoa,
                status: '01'
            })
            .first()
           // .then( dadosDB => res.json(dadosDB))
            .catch(err => res.status(502).send(err))

        if (!docsFromDB.codigoarquivodocumento) {
            dadosDocs.codigopessoadocumento = dados.codigopessoa

        } else {
            dadosDocs.codigopessoadocumento = docsFromDB.codigopessoadocumento
            dadosDocs.arquivorgdocumento = docsFromDB.arquivorgdocumento
            dadosDocs.arquivocpfdocumento = docsFromDB.arquivocpfdocumento
            dadosDocs.arquivoctrabdocumento = docsFromDB.arquivoctrabdocumento
            dadosDocs.arquivocresdocumento = docsFromDB.arquivocresdocumento
            dadosDocs.arquivofotodocumento = docsFromDB.arquivofotodocumento
        }

        switch (dados.tipodoc) {
            case 2:
                dadosDocs.arquivocpfdocumento = dados.arquivo
                break;
            case 3:
                dadosDocs.arquivoctrabdocumento = dados.arquivo
                break;
            case 4:
                dadosDocs.arquivocresdocumento = dados.arquivo
                break;
            case 5:
                dadosDocs.arquivofotodocumento = dados.arquivo
                break;
            default:
                dadosDocs.arquivorgdocumento = dados.arquivo
                break;
        }

        if (!docsFromDB.codigoarquivodocumento) {
            app.db('tbarquivodocumentos')
                .insert(dadosDocs)
                .then(_ => res.status(200).send('Inclusão de Arquivo Ok !'))
                .catch(err => res.status(500).send(err))

        } else {
            app.db('tbarquivodocumentos')
                .update(dadosDocs)
                .where({
                    codigopessoadocumento: dados.codigopessoa,
                    status: '01'
                })
                .then(_ => {
                    res.status(201).send('Alteração do Arquivo Ok !')
                })
                .catch(err => res.status(501).send(err))
        }

        return true
    }
    function apiCEP(cep) {
        console.log('Vai chamar Promisse **** ')
        return new Promisse( (resolve, reject) =>{
            resolve( fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => {
                        // eslint-disable-next-line
                        console.log('Response => ', response)

                        response.json().then(data => {
                            // eslint-disable-next-line
                            console.log('CEP => ', data)
                            endereco = data

                        }).catch(error => {
                            // eslint-disable-next-line
                            console.log(' Erro Response CEP ==> ', error)
                        })
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.log(' Erro Fetch CEP ==> ', err)
                    })
            )
        })
    }
    
    const buscaCEP = async (req, res) => {

        let cep = req.params.id
        let dadosCEP = {}
        
        console.log('Vai chamar busca CEP ==> ')
/*        
        await apiCEP(cep)
        .then( (res) => {
            dadosCEP = res
        })
        .catch( (error) => {
            console.log('Erro buscaCEP ! ')
            dadosCEP = false
        })
*/
        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                // eslint-disable-next-line
                console.log('Response => ', response)

                response.json()
                    .then(data => {
                        // eslint-disable-next-line
                        console.log('CEP => ', data)
                        dadosCEP = data

                    })
                    .catch(error => {
                        // eslint-disable-next-line
                        console.log(' Erro Response CEP ==> ', error)
                    })
                
            })
            .catch(err => {
                // eslint-disable-next-line
                console.log(' Erro Fetch CEP ==> ', err)
            })


        // eslint-disable-next-line
        console.log('CEP => ', dadosCEP)
    
        return dadosCEP
    }

    return { saveEndereco, saveContato,
                getMaxId, 
                getCestNcmSh, getByIdCestNcmSh,
                uploadDocs,
                buscaCEP
    }

}