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