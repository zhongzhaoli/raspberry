$(function(){
    $(".to_div").on("click",function(){
        name_inspect();
    })
    $(window).on("keydown",function(event){
        if(event.keyCode === 13){
            name_inspect();
        }
    })
    function name_inspect(){
        let name = $(".name_input").val();
        if(name){
            if(name.length > 10){
                alert("名字太长了");
            }
            else {
                setCookie("name", name);
                window.location.href = "/live";
            }
        }
        else{
            alert("请输入名字");
        }
    }
})