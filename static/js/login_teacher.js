var socket;
$(function(){
    $.ajax({
        url: "/static/conf/ip.txt",
        type: "get",
        success: function (response) {
            socket = io.connect(response + ":1111");
            socket.on("teacher_login", (data) => {
                if(data === "ok")
                {
                    setCookie("name", "teacher");
                    window.location.href = "/live";
                }
            else
                {
                    alert(data);
                }
            })
            $(".to_div").on("click", function () {
                name_inspect();
            })
            $(window).on("keydown", function (event) {
                if (event.keyCode === 13) {
                    name_inspect();
                }
            })

            function name_inspect() {
                let name = $(".name_input").val();
                socket.emit("teacher_login", name);
            }
        }
    })
});