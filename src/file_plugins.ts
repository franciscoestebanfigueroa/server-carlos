import { mkdirSync, readFileSync, writeFileSync } from "fs"
import { buildLoger } from "./winston_plugins"


const logg=buildLoger("file");

export class file{

    
   static write_archive_confi =(path:string,data:string):boolean=>{
        
        try {
            mkdirSync(path,{recursive:true});
            writeFileSync(path+"/config.txt",data);
            logg.log("se genero correctamente el archivo de configuracion")
            return true;
        
    } catch (error) {
        logg.error('no se pudo crear el archivo de configuracion')
        return false;
    }
}

 static read_archive_config=(path:string):[error?:string,data?:string]=>{

    try {
              
        const read = readFileSync(path+"/config.txt",{encoding:'utf-8'});
        logg.log("se lee el archivo de confiuracion "+ path+"/config.txt "+read);
        
        return [undefined,read];
    } catch (error) {
        logg.error("no se pudo leer el archivo de configuracion "+ path+"/config.txt ");
        return["no se pudo leer el archivo, use la opcion -p para configurar el puerto ej : -p 3000 "+error,undefined]
    }
    }
}