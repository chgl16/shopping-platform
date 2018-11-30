window.onload = function () {
    // 加载订单收货人信息
    var userId = localStorage.getItem("userId");
    $("#username")[0].innerHTML = localStorage.getItem("username");
    $("#contact_phone")[0].innerHTML = localStorage.getItem("userContactPhone");
    $("#contact_address")[0].innerHTML = localStorage.getItem("userContactAddress");

    // 加载订单商品信息
    var bookId = localStorage.getItem("bookId");
    $("#book_img")[0].src = localStorage.getItem("bookImgUrl1");
    $("#book_title")[0].innerHTML = localStorage.getItem("bookTitle");
   // $("#book_type")[0].innerHTML = localStorage.getItem("bookType");
    $("#book_price")[0].innerHTML = "   ￥".concat(localStorage.getItem("bookPrice"));
    // $("#total_price")[0].innerHTML = localStorage.getItem("bookPrice");
}

function submitOrder() {
    console.log("正在提交订单");

    //document.forms[0].submit();
    /* 提交信息，跳转支付 */
    var tradeData = new FormData();
    tradeData.append("bookId", localStorage.getItem("bookId"));
    tradeData.append("bookName", localStorage.getItem("bookTitle"));
    tradeData.append("storeId", localStorage.getItem("storeId"));
    tradeData.append("storeName", localStorage.getItem("storeName"));
    tradeData.append("customerId", localStorage.getItem("userId"));
    tradeData.append("customerName", localStorage.getItem("username"));
    tradeData.append("customerPhone", localStorage.getItem("userContactPhone"));
    tradeData.append("customerAddress", localStorage.getItem("userContactAddress"));
    tradeData.append("price", localStorage.getItem("bookPrice"));
    tradeData.append("remark", $('input[name="remark"]')[0].value);
    tradeData.append("bookImgUrl", localStorage.getItem("bookImgUrl1"));


    $.post({
        url: "/payTrade",
        data: tradeData,
        dataType: "html",
        // 以下三个配置必须添加，这是formData的原因
        catch: false,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log("成功data: " + data);
            //console.log("data: " + JSON.stringify(data));
            /*
            // 创建新窗口对象
            var w = window.open('about:blank');
            // 异步写入资源
            w.document.write(data);
            w.document.close();
            w.print();
            */
            // 试试替换当前页面
            // document.body.innerHTML = data;
            // document.referrer;
            // 千古一句
            document.write(data);
        },
        error: function (data) {
            alert("异常-错误");
        }
    });
}