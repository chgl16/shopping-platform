

/** 定义全局的暂存变量 */
var bookId;
var storeId;

window.onload = function (ev) {
    var bookId = localStorage.getItem("bookId");
    console.log("id:" + bookId);

    // 通过书id获取书和店铺的信息
    $.get({
        url: "/getBookAndStore/".concat(bookId),
        dataType: "json",
        success: function (data) {
            console.log("data: " + JSON.stringify(data));
            // 填充信息
            fillDetails(data)
        },
        error: function (data) {
            alert("异常-错误");
        }
    });
}

function fillDetails(data) {
    // 价格
    $(".product-price-num")[0].innerHTML = data[0].price;
    // 书名
    $(".d-title")[0].innerHTML = data[0].title;
    // 销量库存
    $(".d-num")[0].innerHTML = "销量".concat(data[0].saleVolume).concat(" | 库存").concat(data[0].inventory);
    // 介绍
    $("#book_introduction")[0].innerHTML = (data[0].introduction).substr(0, 20);
    // 类型
    $("#book_type")[0].innerHTML = data[0].type;
    // isbn
    $("#book_isbn")[0].innerHTML = data[0].isbn;
    // 出版社
    $("#book_publication_house")[0].innerHTML = data[0].publicationHouse;
    // 出版时间
    $("#book_publication_date")[0].innerHTML = (data[0].publicationDate).substr(0, 10);
    // 轮播书的图片
    /*
    $(".swiper-slide")[0].childNodes[0].src = data[0].imgUrl1;
    $(".swiper-slide")[1].childNodes[0].src = data[0].imgUrl2;
    $(".swiper-slide")[2].childNodes[0].src = data[0].imgUrl3;
    */
    /*
     改为动态生成
     格式:<div class="swiper-slide"><img src="../../picture/book/default.jpg" alt="图片加载失败"></a></div>
     至少一张
      */
    var html = '<div class="swiper-slide"><img src="'.concat(data[0].imgUrl1).concat('" alt="图片加载失败"></a></div>');
    if (data[0].imgUrl2 != null)
        html += '<div class="swiper-slide"><img src="'.concat(data[0].imgUrl2).concat('" alt="图片加载失败"></a></div>');
    if (data[0].imgUrl3 != null)
        html += '<div class="swiper-slide"><img src="'.concat(data[0].imgUrl3).concat('" alt="图片加载失败"></a></div>');
    if (data[0].imgUrl4 != null)
        html += '<div class="swiper-slide"><img src="'.concat(data[0].imgUrl4).concat('" alt="图片加载失败"></a></div>');
    if (data[0].imgUrl5 != null)
        html += '<div class="swiper-slide"><img src="'.concat(data[0].imgUrl5).concat('" alt="图片加载失败"></a></div>');
    $("#rotation-chart")[0].innerHTML = html;



    // 店名
    $(".product-store-name")[0].innerHTML = "店名:".concat(data[1].name);
    // 店图标
    $(".store-img")[0].src = data[1].imgUrl;

    // id暂存
    bookId = data[0].id;
    storeId = data[1].id;
    // 暂存书的一些信息到localStorage
    localStorage.setItem("bookId", bookId);
    localStorage.setItem("bookTitle", data[0].title);
    localStorage.setItem("bookType", data[0].type);
    localStorage.setItem("bookPrice", data[0].price);
    localStorage.setItem("bookInventory", data[0].inventory);
    localStorage.setItem("bookImgUrl1", data[0].imgUrl1);
    localStorage.setItem("storeId", storeId);
    localStorage.setItem("storeName", data[1].name);


    var swiper = new Swiper('.swiper-container', {
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'custom',
    //         renderCustom: function (swiper, current, total) {
    //           return current + '/ ' + total;
    //         }
    //   },
        speed:2000,
        autoplay:true,
        loop : true,
        loopAdditionalSlides : 2,
        // autoplayDisableOnInteraction : false,
        autoplay:{disableOnInteraction:false},
      });
}

/**
 * 进入店铺看具体信息
 */
function enterStore() {
    // 暂存店铺和书id
    localStorage.setItem("storeId", storeId);
    window.location.href = "store.html";
}

function goToBuy() {
    console.info("跳转到购物!");
    // 检验用户是否登录
    var userId = localStorage.getItem("userId");
    if (userId == null) {
        alert("您尚未登录，正跳转登录页面");
        window.location.href = "login.html";
    } else {
        // 用户已经登录
        // 检查库存量
        if (localStorage.getItem("bookInventory") > 0)
            window.location.href = "confirm_order.html";
        else
            alert("抱歉，书已售完！");
    }
}