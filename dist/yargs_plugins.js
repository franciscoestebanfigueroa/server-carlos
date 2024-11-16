"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argumentos = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const argumentos = () => {
    const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).
        options('l', {
        alias: 'listar',
        type: 'boolean',
        describe: "listado del archivo de configuracion",
        default: false,
    })
        .options('p', {
        alias: 'port',
        type: 'number',
        describe: 'puerto socket',
        default: null
    })
        .parseSync();
    // console.log(argv)
    return argv;
};
exports.argumentos = argumentos;
