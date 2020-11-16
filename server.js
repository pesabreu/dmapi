const express = require('express');
const app = express();
const consign = require('consign');

// Load estrutura
consign()
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api/recipes.js')
  .then('./config/routes.js')
  .into(app)

module.exports = app;
