// new Promise((resolve, reject)=>{
//   console.log(`${'\x1B[32m'}hello world!${'\x1B[0m'}`);
//   setTimeout(() => {
//     console.log(`time: ${new Date().getTime()}`);
//     resolve({}+[]);
//   }, 1000);
// })
// .then(value => new Promise((resolve, reject)=>{
//   if(typeof(value) === void 0){
//     resolve(114514);
//   }else{
//     reject(1919810);
//   }
// }))
// .then(value=>{
//   console.log(value);
// })
// .catch(error=>{
//   console.log(error);
// })


class Yangzheng_Junior_Motherfucking_High_School {
  constructor($){
    'use strict'
    this.type = `RUBBISH`;
    this.description = `a motherf■■king FORMALISTIC unbitchment insane unbelievable inhumane school`;
  }

  join($){
    console.log('welcome to our school!')
    new Promise((res, rej)=>{
      setTimeout(()=>{
        console.log(`it is ${this.description}`)
        res(114514)
      },1000)      
    })
    .then(val => new Promise((res, rej) => {
      setTimeout(()=>{
        console.log(`the description is:`)
        res(1919810)
      },1000)      
    }))
    .then(val => {
      throw "找不到讲述者"
    })
  }
}