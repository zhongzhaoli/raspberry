var socket;
$(function(){
    $.ajax({
        url: "/static/conf/ip.txt",
        type: "get",
        success:function(response){
            socket = io.connect(response + ":1111");
            if(!localStorage.name){
                window.location.href = "/";
            }
            else{
                $(".user_name").html(localStorage.name);
                socket.emit("student_login",localStorage.name);
            }
            //Vue 框架
            var app = new Vue({
                el: '#user_list',
                data: {
                    user_list: []
                }
            });
            var app3 = new Vue({
                el: '#user_list_num',
                data: {
                    length: ""
                }
            });
            socket_get_fun.main(app,app3);
            //页面刷新获取用户列表和人数
            socket.emit("refurbish","");
            $(".handup").on("click",function(){
                socket.emit("handup","");
            });
        }
    });
});
//flv对象
var flv_fun = {
    show: function(){
        if($(".mainContainer").length){
            return;
        }
        else{
            $('<div class="mainContainer"><video id="videoElement" class="centeredVideo" controls autoplay width="1024" height="576"></video></div>').appendTo($(".kx-main-video"));
            var player = document.getElementById('videoElement');
            if (flvjs.isSupported()) {
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    "isLive": true,
                    url: 'http://10.1.53.26:8080/live/pbh.flv'
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load(); //加载
                $(".kx-video").hide();
            }
        }
    },
    hide: function(){
        $(".mainContainer").remove();
        $(".kx-video").show();
    }
};
//主接收对象
var socket_get_fun = {
    main: function(app,app3){
        socket.on('login', (data) => {
            console.log(data);
        });
        socket.on('online_list', (data) => {
            app.user_list = data;
            app3.length = data.length;
        });
        socket.on("message", (data) => {
            alert(data);
        });
        socket.on("refurbish", (data) => {
            app.user_list = data.user_list;
            app3.length = data.user_num;
        });
        socket.on("login_name_max", (data) => {
            alert("名字过长");
            delCookie("name");
            window.location.href = "/";
        })
        socket.on("handup", (data) => {
            alert(data + "举手了");
        })
    }
}