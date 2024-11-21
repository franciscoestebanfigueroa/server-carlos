"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websk = void 0;
const http_1 = require("http");
const ws_1 = require("ws");
const path_1 = __importDefault(require("path"));
const websk = (port) => {
    console.log('en web socket');
    const server = (0, http_1.createServer)({});
    const wss = new ws_1.WebSocketServer({ server });
    const publicPath = path_1.default.resolve(__dirname, '../public');
    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);
        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });
        ws.send('something');
    });
    server.listen(port);
};
exports.websk = websk;
