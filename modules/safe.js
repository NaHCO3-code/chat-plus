/**
 * safe.js: 安全策略组
 * @author shr-nahco3<shrshr2@163.com>
*/

/**
 * 随机获得key
 * @return key
*/
function getKey(){
    let res = '';
    for(i=0;i<16;i++){
        res += String.fromCharCode(Math.floor(Math.random()*0x10ffff));
    }
    return res;
}


/**
 * 对字符串加密
 * 给定两个字符串进行加密
 * @param text{String} 要加密的值
 * @param key{String} 加密key
 * @return 加密结果
 */
function xor(text, key){
    let textlen = text.length;
    let keylen = key.length;
    let res = '';
    for(let i=0; i<textlen; i++){
        res += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i%keylen));
    }
    return res;
}


module.exports = {
    xor,
}