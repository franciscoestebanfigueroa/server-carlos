import yargs from "yargs"
import{hideBin}from "yargs/helpers"


export const argumentos=() =>{ 
    const argv=yargs(hideBin(process.argv)).
    options('l',{
        alias:'listar',
        type:'boolean',
        describe:"listado del archivo de configuracion",
        default:false,
        
    }
    )
    .options(
        'p',{
            alias:'port',
            type:'number',
            describe:'puerto socket',
            default:null
        }
    )
    .parseSync()
   // console.log(argv)
 return argv;   
}
