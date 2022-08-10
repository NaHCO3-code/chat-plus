const safe = require('./safe.js')

const safeget = (data, socket) => {
  let dataJSON = JSON.parse(data);
  socket.emit(dataJSON.event, safe.xor(dataJSON.data, socket.config.safe.key))
}



module.exports = {
  constants: {
    
  },
  routes: {
    safeget,
  }
}