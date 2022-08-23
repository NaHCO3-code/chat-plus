const safe = require('./safe.js')
const scon = require('./sconsole.js')

function on(socket, event, callback){
  socket.on(event, (data)=>{
    // try{
    //   callback(data)
    // }catch(err){
    //   scon.error(0, `${err}`)
    // }
    callback(data)
  })
}

module.exports = {
  on,
}