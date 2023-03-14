const chatContainer = document.getElementById("chat-messages");
const messageForm = document.getElementById("message-form");
const usernameInput = document.getElementById("username");
const textInput = document.getElementById("text");

const socket = new WebSocket("ws://localhost:8080/ws");

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${msg.username} (${msg.time}):</strong> ${msg.text}`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const msg = {
    username: usernameInput.value,
    text: textInput.value,
  };

  socket.send(JSON.stringify(msg));
  textInput.value = "";
});
