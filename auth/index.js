const http = require("http");
const app= require("./app");
const server=  http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const API_PORT="5500";
const port=process.env.PORT || API_PORT;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
users = {}
io.on('connection', (socket) => {
    console.log(socket.headers);
    console.log('a user connected');
    socket.on('coords', (msg) => {
        const coords = JSON.parse(msg);
        console.log('long: ' + coords.long + '\n' + "lat: " + coords.lat);
      });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

