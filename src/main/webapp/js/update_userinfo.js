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
    $("#form1").ajaxForm(function (data) {
            console.log(data);
            console.log("str:" + JSON.stringify(data));
        }

    );
});