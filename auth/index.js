const http = require("http");
const app= require("./app");
const server=  http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const API_PORT="5500";
const port=process.env.PORT || API_PORT;

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
users = {};
sosUser = "";
io.on('connection', (socket) => {
    console.log('a user connected');
    users[socket.id.toString()] = "";
    socket.on('coords', (msg) => {
        const coords = JSON.parse(msg);
        sosUser = socket.id.toString();
        console.log('long: ' + coords.long + '\n' + "lat: " + coords.lat);
        users[socket.id.toString()] = coords; 
        console.log(users)
        usrs = Object.keys(users);
        usrs.forEach(user => {
            if(user != socket.id.toString()){
                io.to(user).emit('coords', JSON.stringify(coords));
            }
        });
    });
    socket.on('helping', (msg) => {
        const coords = JSON.parse(msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete users[socket.id.toString()];
    });

});

server.listen(port,'172.22.55.162', () => {
    console.log(`listening on port ${port}`);
});

