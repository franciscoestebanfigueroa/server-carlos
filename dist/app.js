"use strict";
const express = require('express');
const app = express();
const buildLoger = require("./winston");
const logger = buildLoger("http");
app.get('/pancho', function (req, res) {
    logger.log("GET /pancho");
    res.status;
});
app.get('/carlos', function (req, res) {
    logger.log("GET /carlos");
    res.status;
});
app.listen(3000, () => {
    logger.log(`conectado server a puerto 3000}`);
    console.log("server coriendo en puerto 3000");
});
