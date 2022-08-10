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
/**
 * 安全发送
 * 对给定的事件和数据安全发送
 * @param event{String} 事件名
 * @param data{String} 数据
 * @param socket{Object} 要发送的socket
*/
function safeSend(event, data, socket){
    socket.emit('safeget',JSON.stringify({
      event,
      data: xor(data, socket.config.safe.key)
    }))
}



var start = new Date().getTime()

const routes = {
    safeget: (data)=>{
        let dataJSON = JSON.parse(data)
        start = new Date().getTime()
        safeSend(dataJSON.event, dataJSON.data, socket)
    },
    mes: (data)=>{
        //console.log(xor(data, socket.config.safe.key))
        console.log(new Date().getTime() - start)
    }
}

var socket = io.connect('http://localhost:3000');

//连接成功时触发
socket.on('connect', function () {
    console.log('连接成功');
    socket.config = {
        safe: {
            key: getKey(),
        }
    }
});

//连接断开时触发
socket.on('disconnect', function () {
    console.log('连接断开');
});

Object.keys(routes).forEach((val)=>{
    //收到消息时触发
    socket.on(val, function (data) {
        var node = document.createElement("li");
        var ul = document.querySelector('#receive');
        var aft = document.querySelector('.lasest');
        node.innerHTML = `<p class="getT">⬇收到: </p> (${val}) ${data}`
        document.querySelector("#receive").appendChild(node);
        ul.scrollTop = ul.scrollHeight
        routes[val](data);
    });        
})



document.querySelector("#event").onclick = function () {
    var msg = document.querySelector("#msg").value;
    var ul = document.querySelector('#receive');
    var etn = document.querySelector('#eventname').value;
    //参数一表示，事件的名称
    //参数二表示，要发送的数据
    socket.emit(etn, msg);
    var node = document.createElement("li");
    node.innerHTML = `<p class="sendT">⬆发送</p> (${etn}) ${msg}`
    document.querySelector("#receive").appendChild(node);
    ul.scrollTop = ul.scrollHeight
};