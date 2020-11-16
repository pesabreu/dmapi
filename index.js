const express = require('express')
const app = express()
const consign = require('consign')
consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

let dias = new Array(
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
);

const os = require('os')
let ip = 0
for (let addresses of Object.values(os.networkInterfaces())) {
    //console.log(' Address ==> ', addresses);
    if (addresses[3]) {
        ip = addresses[3].address       
    }
}
console.log(' IP Address ==> ', ip);



let dt = new Date()
let mes = dt.getMonth() + 1
let diasemana = dias[dt.getDay()]
dta = dt.getDate() + '/' + mes + '/' + dt.getFullYear() + '  ' 
        + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()

app.listen(3000, () => {
    console.log(' ')
    console.log('        API em Operação..... ==> ', diasemana + ' - ' + dta)
})
