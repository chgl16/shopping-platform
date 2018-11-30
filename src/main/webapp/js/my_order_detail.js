var transactionId;
var bookId;

window.onload = function (ev) {
    transactionId = localStorage.getItem("transactionId");
    // 交互获取订单信息
    $.get({
        url: "/getTransaction/".concat(transactionId),
        dataType: "json",
        success: function (data) {
            console.log("data: " + JSON.stringify(data));
            // 填充页面数据
            fillPageMessage(data);
        },
        error: function (data) {
            alert("异常-错误");
        }
    });
}

function fillPageMessage(data) {
    bookId = data.bookId;
    document.getElementById("customerName").innerHTML = data.customerName;
    document.getElementById("customerPhone").innerHTML = data.customerPhone;
    document.getElementById("customerAddress").innerHTML = data.customerAddress;
    document.getElementById("storeName").innerHTML = data.storeName;
    document.getElementById("bookName").innerHTML = data.bookName;
    document.getElementById("bookImgUrl").src = data.bookImgUrl;
    document.getElementById("price").innerHTML = data.price;
    $(".order-product-price")[0].innerHTML = "￥".concat(data.price);
    document.getElementById("remark").innerHTML = data.remark;
    document.getElementById("orderId").innerHTML = data.orderId;
    document.getElementById("time").innerHTML = data.time;
    var status = "尚未发货";
    switch (data.status) {
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

    document.getElementById("status").innerHTML = status;
}

function goProductDetail() {
    localStorage.setItem("bookId", bookId);
    window.location.href = "product_details.html";
}