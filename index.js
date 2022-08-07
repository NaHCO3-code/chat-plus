const path = require('path');
const safe = require('./modules/safe.js');
let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

// 测试用
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/test.html')
})


io.on('connection', (socket)=>{
    socket.config = {
        safe: {
            key: safe.getKey(),
        }
    }
})


server.listen(3000, (err)=>{
    console.log(err?err:"3000");
})