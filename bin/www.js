const app = require('../app');
const socketAPI = require("../socketAPI");
const http = require('http');
const port = process.env.PORT || "8888";

app.set("port", port);
const server = http.createServer(app);
socketAPI.io.attach(server);

server.listen(port, () => {
    console.log(`Server Running at http://127.0.0.1:${port}`);
});