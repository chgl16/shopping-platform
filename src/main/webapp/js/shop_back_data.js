window.onload = function (ev) {
    isLogin();

    // 给需要提交的店铺id赋值
    $("input[type=hidden]").val(localStorage.getItem("storeId"));
    console("要发送的店铺id:" + $("input[type=hidden]").val());

    // form表单ajax提交数据
    $("#book_form").ajaxForm(function (data) {
            console.log(data);
            console.log("str:" + JSON.stringify(data));
            if (data == "success") {
                alert("发布成功");
            }
        }
    );
}

/**
 * 客户端验证：
 * 判断店主是否登录，未登录转至登录页面
 */
function isLogin() {
    if (localStorage.getItem("ownerId") == null)
        window.location.href = "../view/login.html";

}

