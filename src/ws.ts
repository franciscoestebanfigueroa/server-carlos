import { createServer } from 'http';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';
import path from 'path';
import express from 'express'
import { cron } from './cron';




export const websk =(port:number)=>{

    console.log('en web socket')
    const app= express()
    const publicPath = path.resolve(__dirname,'../public');

    const server = require('http').createServer(app);
    
    const wss = new WebSocketServer({ server });
    app.use(express.static(publicPath));
    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);
        
       

        ws.on('message', function message(data) {
            wss.clients.forEach(function each(client) {
              if (client.readyState === 1) {
                client.send(data.toString() );
              }
            });
          });
          
          ws.send('conectado..');
          cron.execute(( "*/5 * * * * *"),()=>{
            wss.clients.forEach(function each(client) {
              if (client.readyState === 1) {
                client.send("{x:10,y:20,z:30}");
              }
            });
          }).start();
    });
    
    server.listen(port);
    
 
}