/**
 * 显示选择上传的图片略缩图
 * 当选择了图片文件时触发这个方法
 */
function previewFile() {
    // 通过标签选择器获取HTML元素
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    // Js内置文件流
    var reader = new FileReader();

    // 更新img标签的src属性为图片的本地路径，就可以显示了
    reader.onloadend = function () {
        preview.src = reader.result;
    }

    // 图片文件不空就显示
    if (file) {
        reader.readAsDataURL(file);
    } else {
        // 图片文件是空的
        preview.src = "";
    }
}

$(function () {
    // 用户未登录
    if (localStorage.getItem("userId") == null) {
        alert("抱歉，你尚未登录");
        window.location.href = "login.html";
    }

    // 设置要提交的申请者id
    $("#userId").val(localStorage.getItem("userId"));

    $("#form1").ajaxForm(function (data) {
            console.log(data);
            console.log("str:" + JSON.stringify(data));

            // 更新信息
            localStorage.setItem('username', $("#username").val());
            localStorage.setItem('userContactPhone', $("#contactPhone").val());
            localStorage.setItem('userContactAddress', $("#contactAddress").val());
            var imgUrl = ("../../picture/user/".concat($("#userId").val())).concat(".png");
            localStorage.setItem('userImgUrl', imgUrl);

            console.log("imgUrl:" + imgUrl);
            alert("成功修改个人信息");
            window.location.href = "index.html"
        }
    );
});