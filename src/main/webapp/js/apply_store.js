/**
 * 提交店铺申请
 */
$(function () {
    // 设置要提交的申请者id
    $("#ownerId").val(localStorage.getItem("userId"));

    $("#form1").ajaxForm(function (data) {
            console.log(data);
            console.log("str:" + JSON.stringify(data));
            alert("提交申请成功,请耐心等待审核");
            window.location.href = "index.html"
        }
    );
});