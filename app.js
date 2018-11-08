//模块加载
const ex = require('express')();
const express = require('express');
const path = require('path');
const http = require('http').Server(ex);
const io = require('socket.io')(http);

//在线列表
let online_user = [];
//用户socket储存
let SocketObj = {};
//老师ip
let teacher = "";
//上个老师ip
let last_teacher = "";

var arr = {
    "login": "用户登录的广播",
    "online_list": "用户列表的广播",
}

//静态资源目录
ex.use(express.static(path.join(__dirname, '/')));

//服务器创建
http.listen(1111,() =>  {
    console.log("服务器创建成功");
});
//服务器与网站挂钩
ex.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});
//服务器与网站挂钩
ex.get('/teacher', (req, res) => {
    res.sendfile(__dirname + '/teacher.html');
});
//服务器与网站挂钩
ex.get('/live', (req, res) => {
    res.sendfile(__dirname + '/live.html');
});

//连接1
io.on('connection', (socket) => {
    //获取登录IP
    let ip = get_user_ip(socket);
    //打印IP
    console.log('访问者IP：' + ip);
    socket.id = ip;
    socket.url = socket.handshake.headers.referer.split("1111/")[1];
    if(last_teacher === socket.id && socket.url === "live"){
        teacher = socket.id;
        last_teacher = socket.id;
    }
    //访问者不在在线列表的话就加入在线列表
    if(!(online_user.indexOf(ip) >= 0)){
        online_user.push(ip);
    }
    //存储user的socket
    SocketObj[socket.id] = socket;
    //登录广播
    io.emit('login',ip);
    //用户列表广播
    io.emit('online_list',online_user);
    //页面刷新结束后获取在线人数和在线列表
    socket.on('refurbish', function(){
        var a = {
            'user_list': online_user,
            'user_num': online_user.length
        };
        SocketObj[socket.id].emit("refurbish",a)
    });
    //teacher
    socket.on("teacher_login",function(password){
        if(password === "teacher123456"){
            if(!teacher) {
                teacher = socket.id;
                last_teacher = socket.id;
                SocketObj[socket.id].emit("teacher_login","ok");
            }
            else{
                SocketObj[socket.id].emit("teacher_login","已有老师在上课" + teacher);
            }
        }
        else{
            SocketObj[socket.id].emit("teacher_login","密码错误");
        }
    });
    //举手
    socket.on("handup",function(){
        SocketObj[teacher].emit("handup",socket.id);
    })
    //离开
    socket.on('disconnect', function(){
        //用户列表删除
        online_user.remove(socket.id);
        //打印离开者
        console.log('离开者：' + socket.id);
        //用户列表广播
        io.emit('online_list',online_user);
        //如果是老师，删除老师
        if(socket.id === teacher){
            teacher = "";
        }
    });
})


//数组remove方法
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//获取IP方法
function get_user_ip(socket){
    //socket获取IP
    let ip;
    if(socket.handshake.headers['x-forwarded-for'] != null){
        ip = socket.handshake.headers['x-forwarded-for'];
    }else{
        ip = socket.handshake.address;
    }
    //处理获取到的IP
    (ip.indexOf(':ffff:') >= 0) ? ip = ip.split(':ffff:')[1] : ip = ip;
    return ip;
}