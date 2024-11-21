"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverHttp = void 0;
const express = require("express");
const path = require("path");
const cron_1 = require("./cron");
class serverHttp {
    constructor() { }
    static execute(port) {
        const publicPath = path.resolve(__dirname, '../public');
        console.log(publicPath);
        const app = express();
        app.use(express.static(publicPath));
        const server = require('http').createServer(app);
        const io = require('socket.io')(server);
        io.on('connection', (client) => {
            console.log('conectado io');
            client.on('event', (data) => {
            });
            client.on('event', function (data) { console.log('data ==> ', data); });
            cron_1.cron.execute(("1 * * * * *"), () => {
                io.emit('mensaje', '{nombre:pancho}');
                console.log('enviando data');
            }).start();
            client.on('disconnect', () => { console.log('desconectado io'); });
        });
        try {
            server.listen(port, () => {
                //console.log("server coriendo en puerto "+port)
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.serverHttp = serverHttp;
