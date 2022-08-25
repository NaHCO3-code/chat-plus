new Promise((resolve, reject)=>{
  console.log(`${'\x1B[32m'}hello world!${'\x1B[0m'}`);
  setTimeout(() => {
    console.log(`time: ${new Date().getTime()}`);
    resolve({}+[]);
  }, 1000);
})
.then(value => new Promise((resolve, reject)=>{
  if(typeof(value) === void 0){
    resolve(114514);
  }else{
    reject(1919810);
  }
}))
.then(value=>{
  console.log(value);
})
.catch(error=>{
  console.log(error);
})