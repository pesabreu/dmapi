const app = require('./server');
const { port } = require('./.env');

app.listen(port, () => {
  console.log('\n\n API em Operação.....');
});
