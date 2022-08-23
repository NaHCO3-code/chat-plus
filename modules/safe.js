/**
 * safe.js: 安全策略组
 * @author shr-nahco3<shrshr2@163.com>
*/

const nodeRSA = require('node-rsa');
const JSEncrypt = require('node-jsencrypt');

const scon = require('./sconsole.js');

/**
 * 获取rsa密钥
 * @return nodeRSA
 */
function getKey(){
  return new nodeRSA({b:512});
}

/**
 * 加密
 * 对需要加密的数据进行加密
 * @param {string} data
 * @param {string} publicKey
 */
function encrypt(data, publicKey) {
	let encryptor = new JSEncrypt()
	encryptor.setPublicKey(publicKey)
	return encryptor.encrypt(data)
}

/**
 * 解密
 * 解密
 * @param {string} data
 * @param {string} privateKey
 */
function decrypt(data, privateKey) {
	let decrypt = new JSEncrypt();
	decrypt.setPrivateKey(privateKey);
	return decrypt.decrypt(data);
}

/**
 * 加密发送
 * @param {Socket} socket socekt
 * @param {String} publicKey 公钥
 * @param {String} event 事件
 * @param {*} data 数据
 */
function sendEncrypted(socket, publicKey, event, data){
  socket.emit(event, encrypt(data, publicKey));
}

module.exports = {
  getKey,
  encrypt,
  sendEncrypted,
}