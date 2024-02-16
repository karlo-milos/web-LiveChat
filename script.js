document.addEventListener("DOMContentLoaded", (event) => {
    const socket = new WebSocket('ws://localhost:3000');
    var button = document.getElementById("send-button");
    var messagesDiv = document.getElementById("message-container");
    button.addEventListener('click', (event)=>{
        event.preventDefault();
        let text = document.getElementById("message-input").value;
        if (text != ""){
            console.log(text);
            socket.send(text);
        }
    });

    socket.addEventListener('open', (event)=>{
        console.log("Connected");
    });

    socket.addEventListener('message', (event)=>{
        messagesDiv.innerHTML += event.data + "<br>";
        console.log("event.data: " + event.data);
    })
});
