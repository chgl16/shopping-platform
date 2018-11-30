var storeId;

// 加载店铺的书
window.onload = function (ev) {
    storeId = localStorage.getItem("storeId");

    $.get({
        url: "/getStoreUnsentTransaction/".concat(storeId),
        dataType: "json",
        success: function (data) {
            fillUnsentPage(data);
            var str = JSON.stringify(data);
            console.info("dataStr: " + str);
        },
        error: function (data) {

        }
    });
}

function fillUnsentPage(data) {
    // 更新记录数
    $(".count")[0].innerHTML = data.length;

    // 使用字符串
    var ulHtml = "";
    for (var i = 0; i != data.length; ++i) {
        ulHtml += '<li class="order_li">\n' +
            '\t\t\t\t\t<div class="order_li_top">\n' +
            '\t\t\t\t\t\t<input type="checkbox" class="check_it">\n' +
            '\t\t\t\t\t\t<span>订单编号：'.concat(data[i].orderId).concat('</span>\n' +
            '\t\t\t\t\t\t<span>创建时间：'.concat(data[i].time).concat('</span>\n' +
            '\t\t\t\t\t\t<div class="send_btn" onclick="sendBook('.concat(data[i].id).concat(')">发货</div>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="order_li_con">\n' +
            '\t\t\t\t\t\t<div class="order_li_con_left">\n' +
            '\t\t\t\t\t\t\t<img src="'.concat(data[i].bookImgUrl).concat('">\n' +
            '\t\t\t\t\t\t\t<div class="li_con_detail">\n' +
            '\t\t\t\t\t\t\t\t<p>'.concat(data[i].bookName).concat('</p>\n' +
            '\t\t\t\t\t\t\t\t<span>图书id：'.concat(data[i].bookId).concat('</span>\n' +
            '\t\t\t\t\t\t\t\t<span>图书名称：'.concat(data[i].bookName).concat('</span>\n' +
            '\t\t\t\t\t\t\t\t<em>'.concat(data[i].price).concat(' x 1</em>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t<div class="order_li_con_right">\n' +
            '\t\t\t\t\t\t\t<div>\n' +
            '\t\t\t\t\t\t\t\t<span>收货地址：</span>\n' +
            '\t\t\t\t\t\t\t\t<p class="adress">'.concat(data[i].customerAddress).concat('</p>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t<div>\n' +
            '\t\t\t\t\t\t\t\t<span>收 件 人：</span>\n' +
            '\t\t\t\t\t\t\t\t<p>'.concat(data[i].customerName).concat('</p>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t<div>\n' +
            '\t\t\t\t\t\t\t\t<span>联系电话：</span>\n' +
            '\t\t\t\t\t\t\t\t<p>'.concat(data[i].customerPhone).concat('</p>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t</li>')))))))))));
    }
    $(".order_list")[0].innerHTML = ulHtml;
}

/**
 * 发货
 *
 * @param transactionId
 */
function sendBook(transactionId) {
    $.get({
        url: "/updateStatusToSend/".concat(transactionId),
        dataType: "json",
        success: function (data) {
            if (data == "success") {
                alert("发货成功");
                window.location.reload();
            }
        },
        error: function (data) {
            alert("异常-错误");
        }
    });
}