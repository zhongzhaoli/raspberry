const socket = io.connect('http://192.168.0.132:1111');
$(function(){
    //Vue 框架
    var app = new Vue({
        el: '#user_list',
        data: {
            user_list: []
        }
    });
    var app2 = new Vue({
        el: '#barrage_show_div',
        data: {
            barrage: []
        }
    });
    var app3 = new Vue({
        el: '#user_list_num',
        data: {
            length: ""
        }
    });
    socket_get_fun.main(app,app2,app3);
    //页面刷新获取用户列表和人数
    socket.emit("refurbish","");
    window.requestAnimationFrame(step);
});
//主接收对象
var socket_get_fun = {
    main: function(app,app2,app3){
        socket.on('login', (data) => {
            console.log(data);
        });
        socket.on('online_list', (data) => {
            app.user_list = data;
            app3.length = data.length;
        });
        socket.on('barrage', (data) => {
            app2.barrage.push(data);
            video_roll(data.msg);
            setTimeout(() => {
                $("#barrage_show_div")[0].scrollTop = $("#barrage_show_div")[0].scrollHeight;
            },0)
         });
        socket.on("message", (data) => {
            alert(data);
        });
        socket.on("refurbish", (data) => {
            app.user_list = data.user_list;
            app3.length = data.user_num;
        })
    }
}