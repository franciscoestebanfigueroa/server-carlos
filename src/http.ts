import { number } from "yargs";
import { file } from "./file_plugins";
import { buildLoger } from "./winston_plugins";
import express = require('express')
import path = require("path");
import { cron } from "./cron";

export class serverHttp{


    constructor(){}

   static execute(port:number):boolean{

        const publicPath = path.resolve(__dirname,'../public');

        console.log (publicPath)
         const app = express()   
        
        app.use(express.static(publicPath));
         const server = require('http').createServer(app);
         const io = require('socket.io')(server);

         io.on('connection', (client:any) => {

             console.log('conectado io')
             
             client.on('event', (data:any) => { 
             });
             client.on('event',function(data:any    ){console.log('data ==> ',data)})    
             cron.execute(("1 * * * * *"),()=>{
                io.emit('mensaje','{nombre:pancho}')
                console.log('enviando data')
             }).start()

           client.on('disconnect', () => { console.log('desconectado io')});
         });
         
               
        try {
            server.listen(port,()=>{
                //console.log("server coriendo en puerto "+port)
            })
        return true;
        } catch (error) {
            return false;
        }
}
}