import { start } from "repl"
import { serverHttp } from "./http";
import { Arguments } from "yargs";
import { argumentos } from "./yargs_plugins";
import { file} from "./file_plugins";
import { buildLoger } from "./winston_plugins";

(async()=>{
  await main();
})()



function main(){
  const logg=buildLoger("main");
  const {l,p}=argumentos();
  let port;
    const [error,data]=(file.read_archive_config("./config"))
  if(error){
    console.log( 'error no se pude leer el archivo de configuracion, se creo uno nuevo con puerto 3000')
    file.write_archive_confi("./config","3000");

    return;
  }
  port=+data!;
  if(l){
    
    console.log("servidor configurado en el puerto "+data);
    return;
    
  }
  
  if(p){
    console.log("configurar puerto..");
    file.write_archive_confi("./config",p.toString())
    ?console.log('se guardo la configuracion con el puerto '+ p)
    :console.log('no se pudo guardar la configuracion..')
    
   // console.log(file.read_archive_config("./config"))
    return
  }


  if(serverHttp.execute(port)){
    console.log('servidor encendido en el puerto '+ port)
    logg.log('servidor encendido en puerto '+port);
    }
    else{
      console.log(" no se pudo encender el servidor ver los log..node -l")
      logg.error('no se pudo inicializar server en el puerto '+port)
    }

}