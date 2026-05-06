import client from "./redisClient.js";

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 🔹 join users
    socket.on("join", async (username) => {
      await client.sAdd("online_users", username);

      const users = await client.sMembers("online_users");

      io.emit("online_users", users);
    });

    // 🔹 send message
    socket.on("send_message", async ({ username, message }) => {
      const msgData = {
        username,
        message,
        time: new Date()
      };

      await client.lPush("messages", JSON.stringify(msgData));

      io.emit("receive_message", msgData);
    });

    // 🔹 typing
    socket.on("typing", (username) => {
      socket.broadcast.emit("user_typing", username);
    });
  });
}