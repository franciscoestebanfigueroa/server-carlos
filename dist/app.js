"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const yargs_plugins_1 = require("./yargs_plugins");
const file_plugins_1 = require("./file_plugins");
const winston_plugins_1 = require("./winston_plugins");
const cron_1 = require("./cron");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
function main() {
    const logg = (0, winston_plugins_1.buildLoger)("main");
    const { l, p } = (0, yargs_plugins_1.argumentos)();
    let port;
    const [error, data] = (file_plugins_1.file.read_archive_config("./config"));
    if (error) {
        console.log('error no se pude leer el archivo de configuracion, se creo uno nuevo con puerto 3000');
        file_plugins_1.file.write_archive_confi("./config", "3000");
        return;
    }
    port = +data;
    if (l) {
        console.log("servidor configurado en el puerto " + data);
        return;
    }
    if (p) {
        console.log("configurar puerto..");
        file_plugins_1.file.write_archive_confi("./config", p.toString())
            ? console.log('se guardo la configuracion con el puerto ' + p)
            : console.log('no se pudo guardar la configuracion..');
        // console.log(file.read_archive_config("./config"))
        return;
    }
    if (http_1.serverHttp.execute(port)) {
        console.log('servidor encendido en el puerto ' + port);
        logg.log('servidor encendido en puerto ' + port);
    }
    else {
        console.log(" no se pudo encender el servidor ver los log..node -l");
        logg.error('no se pudo inicializar server en el puerto ' + port);
    }
    cron_1.cron.execute("1 * * * * *", () => {
        console.log('verificando conexion..' + new Date().toISOString());
    }).start();
}
