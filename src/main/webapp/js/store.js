// var swiper = new Swiper('.swiper-container', {
//     pagination: {
//       el: '.swiper-pagination',
//     },
//   });

/**
 * @author chgl16
 * @param ev
 */
window.onload = function (ev) {
    // 获取店铺id
    var storeId = localStorage.getItem("storeId");
    // 加载店铺信息
    $.get({
        url: "/getStore/".concat(storeId),
        dataType: "json",
        success: function (data) {
            console.log("data: " + JSON.stringify(data));
            console.log("店名：" + data.store.name);
            // 填充数据
            fillStore(data);
        },
        error: function (data) {
            alert("异常-失败");
        }
    });

    // 店主显示管理店铺
    if (localStorage.getItem("roleType") == 2) {
        $(".bar-tab")[0].innerHTML += '<a class="tab-item external" href="../manage/shop_back.html">\n' +
        '                    <i class="icon icon-home iconfont icon-dianpu"></i>\n' +
        '                    <!-- 页面跳转 -->\n' +
        '                    <span class="tab-label">管理店铺</span>\n' +
        '                </a>';
    }
}

function fillStore(data) {
    // 店名类别
    $(".store-name")[0].innerHTML = '<i class="iconfont icon-dianpu"></i>'.concat(data.store.name);
    // 店头像
    $(".store-img")[0].src = data.store.imgUrl;

    /*
     动态拼接轮播图
     格式：<div class="swiper-slide"><a class="external swiper-wrapper-body" onclick="goDetails(bookId)"><img src="../../picture/book/default.jpg" alt="图片加载失败"></a></div>
      */
    var chartHtml = "";
    for (var i = 0; i < data.bookList.length; ++i) {
        if (data.bookList[i].show == true) {
            // chartHtml += '<div class="swiper-slide"><a class="external swiper-wrapper-body" onclick="goDetails('.concat(data.bookList[i].id).concat(')"><img src="'.concat(data.bookList[i].imgUrl1).concat('" alt="图片加载失败"></a></div>'));
            chartHtml += '<div class="swiper-slide"><a class="external swiper-wrapper-body" onclick="goDetails('.concat(data.bookList[i].id).concat(')"><img src="'.concat(data.bookList[i].imgUrl1).concat('" alt="图片加载失败"></a></div>'));
        }
    }
    $("#rotation-chart")[0].innerHTML = chartHtml;

    var swiperList = new Swiper('.swiper-container',{
        speed:2000,
        autoplay:true,
        loop : true,
        loopAdditionalSlides : 2,
        autoplayDisableOnInteraction : false,
      
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
    });

    // 动态拼接图书列表
    /*
    格式
    <div class="external category-list" onclick="goDetails(data.bookList[i].id)">
        <div class="category-list-img">
            <img src="../../img/loading.jpg" alt="failed" />
            <div class="category-name category-list-name">图书列表</div>
        </div>
     </div>
     */
    var html = $(".categories-store-list")[0].innerHTML;
    for (var i = 0; i < data.bookList.length; ++i) {
        html += '<div class="external category-list" onclick="goDetails('.concat(data.bookList[i].id).concat(')">\n' +
            '        <div class="category-list-img">\n' +
            '            <img src="'.concat(data.bookList[i].imgUrl1).concat('" alt="failed" />\n' +
            '            <div class="category-name category-list-name">'.concat(data.bookList[i].title).concat('</div>\n' +
            '        </div>\n' +
            '     </div>')));
    }
    $(".categories-store-list")[0].innerHTML = html;
}

/**
 * 跳转到书的详情页面
 *
 * @param bookId
 */
function goDetails(bookId) {
    localStorage.setItem("bookId", bookId);
    // alert(bookId);
    window.location.href = "product_details.html";
}


$(".category-name")[0].onclick = function () {
    window.location.href = "search.html";
}
