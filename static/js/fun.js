$(function(){
    start_flash();
    max_800_resize();
    $(".kx-interaction-type-list > div").on("click", function(){
        $(".kx-interaction-type-list > div").map((val,item) => {
            $(item).removeClass("active");
        })
        $(".kx-interaction-type-div").map((val,item) => {
            $(item).addClass("kx-dis-none");
        })
        $(this).addClass("active");
        let type = $(this).data("type");
        $(".type" + type).removeClass("kx-dis-none");
    })
    $(window).on("keydown",function(e){
        var key = e.keyCode;
        //回车发送
        if(key == 13){
            send_barrage();
        }
    })
})
$(window).resize(function(){
    max_800_resize();
})
function start_flash(){
    $("#FlashID")[0].click();
}
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
function video_roll(text){
    const video_height = $(".kx-video")[0].offsetHeight;
    const video_width = $(".kx-video")[0].offsetWidth;
    let barrage_top = parseInt(Math.random() * (video_height - 30));
    let a = $("<div class='barrage_video'>" + text + "</div>").appendTo($(".kx-video"));
    a[0].style.top = barrage_top + "px";
    a[0].style.left = video_width + "px";
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
function max_800_resize(){
    var window_width = $("body")[0].offsetWidth;
    var window_height = $("body")[0].offsetHeight;
    if(window_width <= 800){
        let video_height = $(".kx-video")[0].offsetHeight;
        $(".kx-main-interaction")[0].style.height = window_height - video_height - 60 - 40 + "px";
    }
    else{
        $(".kx-main-interaction")[0].style.height = "auto";
    }
}