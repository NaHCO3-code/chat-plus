const path = require('path');
const express = require('express');
const nodeRSA = require('node-rsa');
const JSEncrypt = require('node-jsencrypt');

const safe = require('./modules/safe.js');
const route = require('./modules/route.js');
const config = require('./config.js');
const scon = require('./modules/sconsole.js');
const sql = require('./modules/sql.js');

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// 已连接的socket
let online = [];


io.on('connection', (socket)=>{
  new Promise((res, rej)=>{
    // 将必要数据存入socket
    socket.config = config.socket.configs;
    socket.config.rsaKeyObj = safe.getKey();
    online.push(socket);
    res(void 0);
  })


  // 接受RSA-publicKey
  route.on(socket, 'publicKey', (data)=>{
    socket.config.publicKey = data.publicKey;
    // 发送RSA-publicKey
    socket.emit('publicKey', {publicKey: socket.config.rsaKeyObj.exportKey('pkcs8-public')});
    // hello world
    safe.sendEncrypted(socket, socket.config.publicKey, 'helloworld', 'hello world');
  })
})


// sql初始化
sql.init()
// 启动服务器
.then(()=>{
  sql.register('小苏打', 'e10adc3949ba59abbe56e057f20f883e', '1145141919810');
  server.listen(config.server.port, (err)=>{
    scon.info(0, err?err:`http://localhost:${config.server.port}`);
  })  
})
.catch((err)=>{
  scon.error(0, err);
});