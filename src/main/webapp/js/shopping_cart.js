 //计算赋值方法
 function a(flag) {
    var nowVal = $("#inputVal").val();
    if (flag == '+') {
        $("#inputVal").val(parseInt(nowVal) + 1);
    } else if (flag == '-') {
        $("#inputVal").val(nowVal - 1);
    }
}
//输入框中如果没有值则将输入框中的值重置为1
function b(nowVal) {
    if (nowVal.length == 0) {
        $("#inputVal").val(1);
    }
}

window.onload = function (ev) {
    alert("尚未开放，抱歉！");
    window.location.href = "index.html";
    /*
    // 用户未登录
    if (localStorage.getItem("userId") == null) {
        alert("抱歉，你尚未登录");
        window.location.href = "login.html";
    }
    */
}