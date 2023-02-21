import { io } from "../Server.js"

export default async function(userId) {
    const clients = await io.fetchSockets();
    const filtering = clients.filter(socket => socket.data.username == userId);

    if (filtering.length < 1) return null;
    return filtering[0];
}