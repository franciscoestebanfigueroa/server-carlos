"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const fs_1 = require("fs");
const winston_plugins_1 = require("./winston_plugins");
const logg = (0, winston_plugins_1.buildLoger)("file");
class file {
}
exports.file = file;
file.write_archive_confi = (path, data) => {
    try {
        (0, fs_1.mkdirSync)(path, { recursive: true });
        (0, fs_1.writeFileSync)(path + "/config.txt", data);
        logg.log("se genero correctamente el archivo de configuracion");
        return true;
    }
    catch (error) {
        logg.error('no se pudo crear el archivo de configuracion');
        return false;
    }
};
file.read_archive_config = (path) => {
    try {
        const read = (0, fs_1.readFileSync)(path + "/config.txt", { encoding: 'utf-8' });
        logg.log("se lee el archivo de confiuracion " + path + "/config.txt " + read);
        return [undefined, read];
    }
    catch (error) {
        logg.error("no se pudo leer el archivo de configuracion " + path + "/config.txt ");
        return ["no se pudo leer el archivo, use la opcion -p para configurar el puerto ej : -p 3000 " + error, undefined];
    }
};
