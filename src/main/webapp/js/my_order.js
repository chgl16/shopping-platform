window.onload = function (ev) {
    var customerId = localStorage.getItem("userId");
    // 用户未登录
    // if (customerId == null) {
    //     alert("抱歉，你尚未登录");
    //     window.location.href = "login.html";
    // }

    // 填充订单
    $.get({
        url: "/getCustomerAllTransaction/".concat(customerId),
        dataType: "json",
        success: function (data) {
            console.log("data: " + JSON.stringify(data));
            // 填充数据
            fillTransaction(data);
        },
        error: function () {
            alert("异常-错误");
        }

    });
}

/**
 * 填充订单数据
 *
 * @param data
 */
function fillTransaction(data) {
    // 所有订单
    var allTransaction = "";
    // 未发货订单
    var unsendTransaction = "";
    // 待收货订单
    var sentTransaction = "";
    // 暂存
    var transactionTemp = "";

    for (var i = 0; i < data.length; ++i) {
        // 配置status
        var status = "尚未发货";
        switch (data[i].status) {
            case -1:
                status = "尚未发货";
                break;
            case 0:
                status = "订单失效";
                break;
            case 1:
                status = "已发货";
                break;
            case 2:
                status = "订单签收完成";
                break;
        }

        transactionTemp = '<a onclick="goOrderDetail('.concat(data[i].id).concat(')" class="content-block order-list external">\n' +
            '                        <div class="order-store">\n' +
            '                            <div class="order-store-name"><i class="iconfont icon-dianpu"></i>'.concat(data[i].storeName).concat('</div>\n' +
            '                            <div class="order-status">'.concat(status).concat('</div>\n' +
            '                        </div>\n' +
            '\n' +
            '                        <div class="order-product">\n' +
            '                            <img class="order-product-img" src="'.concat(data[i].bookImgUrl).concat('" alt="">\n' +
            '                            <div class="order-product-main"> \n' +
            '                                <div class="order-product-content">'.concat(data[i].bookName).concat('</div> \n' +
            '                                <div class="order-product-price-info">\n' +
            '                                    <div class="order-product-price">￥'.concat(data[i].price).concat('</div>\n' +
            '                                    <div class="order-product-price">x1</div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            \n' +
            '                        </div>\n' +
            '                        <div class="order-count">\n' +
            '                            <span>共1件商品</span>\n' +
            '                            <span class="order-count-price">合计:￥'.concat(data[i].price).concat('</span>\n' +
            '                        </div>\n' +
            '                        <div class="line"></div>\n' +
            '                        <div class="wuliu-info">\n' +
            '                            <div>查看订单</div>\n' +

            '                        </div>\n' +
            '                    </a>')))))));

        if (status == "尚未发货")
            unsendTransaction += transactionTemp;
        if (status == "已发货")
            sentTransaction += transactionTemp;
        allTransaction += transactionTemp;
    }
    $("#all-transaction")[0].innerHTML = allTransaction;
    $("#unsend-transaction")[0].innerHTML = unsendTransaction;
    $("#sent-transaction")[0].innerHTML = sentTransaction;
}

/**
 * 根据transactionId获取交易详情
 *
 * @param id
 */
function goOrderDetail(id) {
    //
    localStorage.setItem("transactionId", id);
    window.location.href = "my_order_detail.html";
}