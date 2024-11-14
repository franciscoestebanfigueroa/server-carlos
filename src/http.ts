import { number } from "yargs";
import { file } from "./file_plugins";
import { buildLoger } from "./winston_plugins";
import express = require('express')

export class serverHttp{


    constructor(){}

   static execute(port:number):boolean{
         const app = express()   
               
        try {
            app.listen(port,()=>{
                //console.log("server coriendo en puerto "+port)
            })
        return true;
        } catch (error) {
            return false;
        }
}
}