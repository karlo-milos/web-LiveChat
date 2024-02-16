const express = require("express");
const app = express();
const fs = require("fs");
const server = require("http").createServer(app);
const webSocket = require("ws");
const path = require("path");

const wss = new webSocket.Server({ server: server });

function writeStringToCSV(filename, data) {
  fs.appendFile(__dirname + "/" + filename, data + "\n", 'utf8', (err) => {
      if (err) {
          console.error('Error writing to CSV file:', err);
      } else {
          console.log('String has been written to CSV file successfully.');
      }
  });
}

app.use("/", express.static(__dirname));

wss.on("connection", function connection(ws) {
  let message = "Someone joined the chat!";
  writeStringToCSV('messages.csv', message);
  wss.clients.forEach(function each(client) {
    if (client.readyState === webSocket.OPEN) {
      client.send(message);
    }
  });
  ws.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === webSocket.OPEN) {
        writeStringToCSV('messages.csv', message.toString());
        client.send(message.toString());
      }
      else {
        var fullMessage = message.toString();
        var parts = fullMessage.split(":", 2);
        var newMessage = "You:" + parts[1];
        writeStringToCSV('messages.csv', newMessage);
        client.send(newMessage);
      }
    });
  });

  ws.on("close", function close() {
    wss.clients.forEach(function each(client) {
      if (client.readyState === webSocket.OPEN) {
        let message = "Someone left the chat!";
        client.send(message);
      }
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

server.listen(3000, () => {
  console.log("Sever na portu 3000");
});
