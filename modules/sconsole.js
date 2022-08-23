function info(code, message){
  console.log(`[${'\x1B[32m'}info${'\x1B[0m'} ${'\x1B[34m'}${code}${'\x1B[0m'}] ${message}`);
}

function warning(code, message){
  console.log(`[${'\x1B[33m'}warn${'\x1B[0m'} ${'\x1B[34m'}${code}${'\x1B[0m'}] ${message}`);
}

function error(code, err){
  console.log(`[${'\x1B[41m'}ERR!${'\x1B[0m'} ${'\x1B[31m'}${code}${'\x1B[0m'}] ${'\x1B[41m'}${err}${'\x1B[0m'}`);
}

module.exports = {
  info,
  warning,
  error
}