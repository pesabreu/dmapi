const app = require('./server');

// eslint-disable-next-line no-undef
let porta = process.env.PORT;
if (!porta) {
  let { port } = require('./.env');
  porta = port;
}

app.listen(porta, () => {
  console.log('\n\n API em Operação.....');
});
