const socket = io.connect('http://10.1.53.149:1111');
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