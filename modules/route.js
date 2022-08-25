const safe = require('./safe.js')
const scon = require('./sconsole.js')

function on(socket, event, callback){
  socket.on(event, (data)=>{
    if(data.encrypt == true){
      callback(safe.decrypt(data.data, socket.config.rsaKeyObj.exportKey('pkcs8-private')));
    }else{
      callback(data);
    }
  })
}

module.exports = {
  on,
}