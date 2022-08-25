const mysql = require('mysql');

const config = require('../config.js')
const scon = require('./sconsole.js')

/* sql模板 */
const templates = {
  "init": [
    `CREATE TABLE IF NOT EXISTS users(
      \`id\` INT PRIMARY KEY NOT NULL,
      \`tag\` INT,
      \`username\` VARCHAR(64) NOT NULL,
      \`password\` VARCHAR(32) NOT NULL,
      \`group\` MEDIUMTEXT
    );`,
    `CREATE TABLE IF NOT EXISTS \`group\`(
      \`id\` INT PRIMARY KEY NOT NULL,
      \`users\` MEDIUMTEXT NOT NULL,
      \`admin\` TEXT NOT NULL
    );`,
    //`INSERT INTO users (id, username, password) VALUES (10000, 'chat-plus', 'e10adc3949ba59abbe56e057f20f883e');`,//pwd:123456
  ],
  "register": [
    `SELECT * FROM users ORDER BY id DESC LIMIT 1;`,
    `INSERT INTO users (id, username, password) VALUES (?, ?, ?);`
  ]
}

/* 创建连接池 */
const pool = mysql.createPool({
    host     : config.sql.host,
    user     : config.sql.user,    // 数据库用户
    password : config.sql.password, // 数据库密码
    database : config.sql.database,  // 选中数据库
});

/**
 * 同步操作sql
 * @param {String} code
 * @param {String[]} values
 * @example doSqlSync(['...', '...'], [[...], [...]])
 */
function doSqlSync(code, values=[]){
  return new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if(err){
        rej(err);
        return ;
      }
      connection.query(code, values, (err, rows) => {
        if(err){
          rej(err);
        }else{
          res(rows);
        }
        connection.release();
      })
    })
  })
}

/**
 * init
 */
async function init(){
  for(let i=0; i<templates.init.length; i++){
    await doSqlSync(templates.init[i])
    .catch((err)=>{
      scon.error(0, err);
    })
  }
  scon.info(0, 'sql tables created succesfully')
}

async function register(username, password, inviteCode){
  // 二次合法性检查
  if(username.length > 64 || password.length != 32 || inviteCode != config.user.inviteCode){
    scon.error(0, 'register input error');
    return 'FaQ';
  }

  // 写入sql
  await doSqlSync(templates.register[0])
  .then(async val => {
    if(!val.length){
      scon.error(0, 'FaQ!NO ANY USER YET! ADD AN USER WITH ID 10000 TO GET STARTED!!!');
      throw 'FaQ!NO ANY USER YET! ADD AN USER WITH ID 10000 TO GET STARTED!!!';
    }
    return await doSqlSync(templates.register[1], [val[0].id+1, username, password]);
  })
  .then(val => {
    scon.info(0, 'GOOD NEWS! NEW USER REGISTERED SUCCESSFULLY!!!');
  })
}



module.exports = {
  init,
  register,
}