/**
 * 我的店铺模块js
 *
 * @author chgl16
 * @date 2018-11-19 23:37
 * @version 1.0
 **/

window.onload = function (ev) {
    var ownerId = localStorage.getItem("userId");
    localStorage.setItem("ownerId", ownerId);
    // 加载我的店铺数据
    $.get({
        url: "/getMyStore/".concat(ownerId),
        dataType: "json",
        success: function(data) {
            fillInfo(data);
            var str = JSON.stringify(data);
            console.info("dataStr: " + str);
        },
        error: function(data) {
            console.error("失败");
            console.error(JSON.stringify(data));
        }
    });

    // 加载店铺图书
    //
};

/**
 * 填充店铺基本数据
 * @param data
 */
function fillInfo(data) {
    if (data.name == null || data.name == "") {
        // 没有店铺，隐藏店铺div，显示申请div
        console.log("没有店铺");
        $("#store").hide();
    } else {
        console.log("有店铺");
        $("#newStore").hide();
        // 显示店铺信息
        $("#store_name").html(data.name);
        $(".store-img")[0].src = data.imgUrl;
        // 保存店铺id
        localStorage.setItem("storeId", data.id);
    }

}
