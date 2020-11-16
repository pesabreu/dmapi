const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

module.exports = app => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({
        limit: '20mb',
        extended: true
    }));

    app.use(cors())
    app.use(express.static('/public'));
}