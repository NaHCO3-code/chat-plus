const path = require('path');
const express = require('express');
const safe = require('./modules/safe.js');
const route = require('./modules/route.js')

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

// 测试用
app.use(express.static('_web'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/test.html')
})


io.on('connection', (socket)=>{

    socket.config = {
        safe: {
            key: safe.getKey(),
        }
    }


    Object.keys(route.routes).forEach((value)=>{
        socket.on(value, (data)=>{
            route.routes[value](data, socket)
        });
    })
})


server.listen(3000, (err)=>{
    console.log(err?err:"http://localhost:3000");
})