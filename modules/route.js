const safe = require('./safe.js')

const safesend = (event, data, socket) => {
  safe.xor(data, )
}



module.exports = {
  constants: {
    
  },
  routes: {
    safesend,
  }
}