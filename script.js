document.addEventListener("DOMContentLoaded", (event) => {
    const socket = new WebSocket("ws://localhost:3000");
    var button = document.getElementById("send-button");
    var messagesDiv = document.getElementById("message-container");

    var userName = prompt("Unesite tekst:");
    if (userName == "" || userName.includes(":")) {
      window.location.reload();
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (document.getElementById("message-input").value == "") return;
      let text = userName + ": " + document.getElementById("message-input").value;
      if (text != "") {
        socket.send(text);
      }
      document.getElementById("message-input").value = "";
    });

    socket.addEventListener("message", (event) => {
      const message = event.data;
      const newMessageDiv = document.createElement("div");

      if (message.startsWith("You:")) {
        newMessageDiv.classList.add("own-message");
      }
      else {
        newMessageDiv.classList.add("other-message");
      }
      newMessageDiv.textContent = message;
      messagesDiv.appendChild(newMessageDiv);
    });
  });
