$(function(){
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
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        flv_fun.show();
        $(".djs").hide();     
    }
    if(navigator.plugins['Shockwave Flash']){
        //开启了flash
        $(".kx-video").show();
        $(".djs").hide();
    }else{
        //关闭了flash
        $(".kx-video").hide();        
    }
})
$(window).resize(function(){
    max_800_resize();
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
function video_roll(text){
    const video_height = $(".kx-video")[0].offsetHeight;
    const video_width = $(".kx-video")[0].offsetWidth;
    let barrage_top = parseInt(Math.random() * (video_height - 30));
    let a = $("<div class='barrage_video'>" + text + "</div>").appendTo($(".kx-video"));
    a[0].style.top = barrage_top + "px";
    a[0].style.left = video_width + "px";
}
function max_800_resize(){
    var window_width = $("body")[0].offsetWidth;
    var window_height = $("body")[0].offsetHeight;

    if(window_width <= 800){
        let video_height = $(".kx-video")[0].offsetHeight;
        $(".kx-main-interaction")[0].style.height = window_height - video_height - 60 - 40 + "px";
        flv_fun.show();
    }
    else{
        $(".kx-main-interaction")[0].style.height = "auto";
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            flv_fun.show();        
        }
        else{
            flv_fun.hide();        
        }
    }
}