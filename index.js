const app = require('./server')
/*
let dias = new Array(
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
);
let dt = new Date()
let mes = dt.getMonth() + 1
let diasemana = dias[dt.getDay()]
let dta = dt.getDate() + '/' + mes + '/' + dt.getFullYear() + '  ' 
        + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
*/
app.listen(3636, () => {
    //console.log(' ')
    console.log('\n\n API em Operação.....')  // ==> ', diasemana + ' - ' + dta)
})
