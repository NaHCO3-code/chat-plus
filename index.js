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

// sql初始化
sql.init();

io.on('connection', (socket)=>{
  new Promise((res, rej)=>{
    // 将必要数据存入socket
    socket.config = config.socket.configs;
    socket.config.rsaKeyObj = safe.getKey();
    online.push(socket);
    res(void 0);
  })
  .then(val => new Promise((res, rej)=>{
    scon.info(0, socket.config.rsaKeyObj.exportKey('pkcs8-public'));
    res(void 0);
  }))
  .then(val => new Promise((res, rej)=>{
    // 发送RSA-publicKey
    socket.emit('publicKey', {publicKey: socket.config.rsaKeyObj.exportKey('pkcs8-public')})
  }))


  // 接受RSA-publicKey
  route.on(socket, 'publicKey', (data)=>{
    socket.config.publicKey = data.publicKey;
    // 发送测试
    safe.sendEncrypted(socket, socket.config.publicKey, 'helloworld', 'hello world');
  })
})


server.listen(config.server.port, (err)=>{
    console.log(err?err:`http://localhost:${config.server.port}`);
})