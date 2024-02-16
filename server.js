const express = require("express");
const app = express();
const server = require("http").createServer(app);
const webSocket = require("ws");
const path = require("path");
const wss = new webSocket.Server({server: server});

app.use("/", express.static(__dirname)
);


wss.on('connection', function connection(ws){
    ws.send("Novi korisnik se uključio u čat");
    ws.on('message', function incoming(message){
        console.log(message.toString);
        wss.clients.forEach(function each(client) {
            if (client.readyState === webSocket.OPEN) {
              client.send(message.toString());
            }
        });
    })
});

wss.on('close',function close(ws){
    wss.clients.forEach(function each(client) {
        if (client.readyState === webSocket.OPEN) {
          client.send("Neki se korisnik skinuo s čata");
        }
    });
})

app.get('/',(req,res)=>{
    res.sendFile(path + "index.html");
})

server.listen(3000, () => {
    console.log("Sever na portu 3000");
})