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
    })
    socket_fun.main(app,app2,app3);
    window.requestAnimationFrame(step);
    $(window).on("keydown",function(e){
        var key = e.keyCode;
        //回车发送
        if(key == 13){
            send_barrage();
        }
    })
})
function step(timestamp) {
    //滚动
    $(".barrage_video").map((val,item) => {
        const barrage_width = item.offsetWidth;
        //超出video范围 - 20 隐藏
        if(item.offsetLeft <= (-barrage_width) - 20){
            $(item).remove();
        }
        const barrage_left = item.offsetLeft;
        item.style.left = barrage_left - 2 + "px";
    })
    window.requestAnimationFrame(step);
}
function send_barrage(){
    let text = $("#text").val().trim();
    if(text.length >= 20){
        alert("弹幕内容不能超过20个字");
    }
    else {
        if (text != "") {
            socket.emit("barrage", text);
        }
        else {
            alert("弹幕内容不能为空");
        }
    }
    $("#text").val("");
}
//主接收对象
var socket_fun = {
    main: function(app,app2,app3){
        socket.on('login', (data) => {
            console.log(data);
        });
        socket.on('online_list', (data) => {
            app.user_list = data;
            app3.length = data.length;
        })
        socket.on('barrage', (data) => {
            app2.barrage.push(data);
            this.video_roll(data.msg);
        })
        socket.on("message", (data) => {
            alert(data);
        })
    },
    video_roll: function(text){
        const video_height = $(".barrage_box")[0].offsetHeight;
        const video_width = $(".barrage_box")[0].offsetWidth;
        let barrage_top = parseInt(Math.random() * video_height);
        let a = $("<div class='barrage_video'>" + text + "</div>").appendTo($(".barrage_box"));
        a[0].style.top = barrage_top + "px";
        a[0].style.left = video_width + "px";
        $("#barrage_show_div")[0].scrollTop = $("#barrage_show_div")[0].scrollHeight
    }
}