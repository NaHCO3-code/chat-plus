const mysql = require('mysql');

const config = require('../config.js')
const scon = require('./sconsole.js')

/* sql模板 */
const templates = {
  "init": [
    `CREATE TABLE IF NOT EXISTS users(
      \`id\` INT PRIMARY KEY NOT NULL,
      \`username\` VARCHAR(64) NOT NULL,
      \`group\` MEDIUMTEXT
    );`,
    `CREATE TABLE IF NOT EXISTS \`group\`(
      \`id\` INT PRIMARY KEY NOT NULL,
      \`users\` MEDIUMTEXT NOT NULL,
      \`admin\` TEXT NOT NULL
    )`
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
function init(){
  for(let i=0; i<templates.init.length; i++){
    doSqlSync(templates.init[i])
      .then((rows)=>{
        scon.info(0, JSON.stringify(rows));
      })
      .catch((err)=>{
        scon.error(0, err);
      })
  }
}


module.exports = {
  init,
}