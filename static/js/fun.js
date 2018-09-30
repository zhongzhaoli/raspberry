const bl = 1.7764277035236937;
$(function(){
    video_height();
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
})
$(window).resize(function(){
    video_height();
})
function video_height(){
    let a = $(".video-js")[0]
    $(".video-js")[0].style.height = a.offsetWidth / bl + "px";
}