const socket = io();

let username = "";

// 🔹 join chat
function joinChat() {
  username = document.getElementById("username").value;

  socket.emit("join", username);
}

// 🔹 send message
function sendMessage() {
  const message = document.getElementById("message").value;

  socket.emit("send_message", {
    username,
    message
  });

  document.getElementById("message").value = "";
}

// 🔹 receive messages
socket.on("receive_message", (data) => {
  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.innerHTML = `<b>${data.username}:</b> ${data.message}`;

  chatBox.appendChild(div);
});

// 🔹 online users
socket.on("online_users", (users) => {
  document.getElementById("onlineUsers").innerText =
    "Online: " + users.join(", ");
});

// 🔹 typing indicator
document.getElementById("message").addEventListener("input", () => {
  socket.emit("typing", username);
});

socket.on("user_typing", (user) => {
  document.getElementById("typing").innerText =
    user + " is typing...";
  
  setTimeout(() => {
    document.getElementById("typing").innerText = "";
  }, 1000);
});