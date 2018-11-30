var swiperList = new Swiper('.swiper-container-list',{
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

//键盘按下事件
$('#search').mousedown(function(event) {
  window.location.href="search.html";
  console.log("search");
});

/**
 * 从localStorage中获取数据填充用户的个人信息
 *
 * @author chgl16
 * @date 2018-11-19
 */
function fillUserMessage() {
    // 检查是否有登陆信息
    if (localStorage.getItem('userId') != null) {
        // 用户已登陆, 去掉登陆按钮
        $(".user-login")[0].innerHTML = "";
        // 填充用户的头像和用户名
        $(".head-portrait")[0].src = localStorage.getItem("userImgUrl");
        $(".user-status")[0].children[0].innerHTML = localStorage.getItem("username");

        // 检测是否为店主
        if (localStorage.getItem("roleType") == 2) {
            // 获取店主的店铺id
            // 判断要跳转到我的店铺还是申请店铺
            localStorage.setItem("ownerId", localStorage.getItem('userId'))
            $.get({
                url: "/getMyStore/".concat(localStorage.getItem("ownerId")),
                dataType: "json",
                success: function(data) {
                    if (data == null || data.id == 0 || data.id == null) {
                        console.log("店主还没有店铺")
                        addMyStoreModel("apply_store.html");
                    } else {
                        localStorage.setItem("storeId", data.id);
                        addMyStoreModel("store.html");
                        console.info("dataStr: " + JSON.stringify(data));
                    }
                },
                error: function(data) {
                    console.error("失败");
                }
            });
        }
    }
}

function addMyStoreModel(url) {
    // 是店主,动态添加的店铺功能
    $(".bar-tab")[0].innerHTML += '<a id="my_store" class="tab-item external" href="'.concat(url).concat('">\n' +
        '                            <i class="icon icon-home iconfont icon-dianpu"></i>\n' +
        '                            <span class="tab-label">我的店铺</span>\n' +
        '                        </a>');
}

window.onload = function (ev) {
    fillUserMessage();

    // 获取填充推荐数据
    $.get({
        url: "/getBookRecommend",
        dataType: "json",
        success: function (data) {
            console.log("data: " + JSON.stringify(data));
            // 填充轮播图
            fillRotationChart(data);
            // 填充底部推荐的图书列表
            fillBookRecommend(data);
        },
        error: function (data) {
            alert("异常-错误")
        }
    });

}

/**
 * 填充底部推荐的图书列表
 * @param data
 */
function fillBookRecommend(data) {
    /*
    // 获取父亲节点
    var ulElement = $("#dataList")[0];
    for (var i = 0; i != data.length; ++i) {
        //
        //  动态创建li
        //  格式：<li><div class="external category-list" onclick="" ><span class="hidden-span">id</span><div class="category-list-img"><img src="../../img/loading.jpg" alt="failed" /><div class="category-name category-list-name">图书列表</div></div></div></li>
        //
        var liElement = document.createElement("li");
        var spanElement = document.createElement("span");
        var div0Element = document.createElement("a");
        var div1Elemnt = document.createElement("div");
        var div2Elemnt = document.createElement("div");
        var imgElement = document.createElement("img");

        // 从内到外构造
        div2Elemnt.className = "category-name category-list-name";
        div2Elemnt.innerHTML = data[i].title;
        imgElement.src = data[i].imgUrl1;
        div1Elemnt.className = "category-list-img";
        div1Elemnt.appendChild(imgElement);
        div1Elemnt.appendChild(div2Elemnt);
        spanElement.innerHTML = data[i].id;
        spanElement.className = "hidden-span";
        div0Element.className = "external category-list";
        div0Element.onclick = function () {
            // 这里要暂存数据给跳转页面
            var bookId = this.parentNode.childNodes[0].innerHTML;
            localStorage.setItem("bookId", bookId);
        }


        div0Element.appendChild(div1Elemnt);
        // liElement.appendChild(spanElement);
        liElement.appendChild(div0Element);
        ulElement.appendChild(liElement);
    }
    */
    /*  采用字符串拼接法 */
    var html = "";

    for (var i = 0; i != data.length; ++i) {
        if (data[i].recommend == true || data[i].recommend == 1)
            html += '<li><a class="external category-list" onclick="goDetails('.concat(data[i].id).concat(')"><div class="category-list-img"><img src="'.concat(data[i].imgUrl1).concat('" alt="failed" /><div class="category-name category-list-name">'.concat(data[i].title).concat('</div></div></a></li>')));
    }
    $("#dataList")[0].innerHTML = html;
}

/**
 * 填充轮播图
 * @param data
 */
function fillRotationChart(data) {
    /** ############ 该为只修改图片路径

    // 最多5张
    var max = 5;

    for (var n = 0; n < 1; ++n) {  // ######################## 暂时中间的轮播图
        // 获取父亲节点
        var div0Element = $(".swiper-wrapper")[n];
        for (var i = 0; i < data.length && i <  max; ++i) {
            //
            //   格式
            //   <div class="swiper-wrapper" id="rotation-chart">
            //     <div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>
            //   </div>
            //
            var div1Element = document.createElement("div");
            var aElement = document.createElement("a");
            var imgElement = document.createElement("img");
            // 从内到位添加
            imgElement.src = data[i].imgUrl1;
            imgElement.alt = "图片加载失败";
            aElement.className = "external swiper-wrapper-body";
            aElement.href = "product_details.html";
            aElement.appendChild(imgElement);
            div1Element.className = "swiper-slide";
            div1Element.appendChild(aElement);
            div0Element.appendChild(div1Element);
            console.log("运行了");
        }
    }
     **/
    /* 这种方法不及时更新，DOM改变了，但是不显示更新效果
    for (var i = 0; i < data.length && i <  3; ++i) {
        // 利用解释性的语言特性拼接变量
        $("#rotation-img".concat(i+1))[0].src = data[i].imgUrl1;
    }
    */
    /** 采用字符串拼接 */
    var html = "";
    for (var i = 0; i < 5 && i < data.length; ++i) {
        if (data[i].recommend == true || data[i].recommend == 1) {
            html += '<div class="swiper-slide"><a class="external swiper-wrapper-body" onclick="goDetails('.concat(data[i].id).concat(')"><img src="'.concat(data[i].imgUrl1).concat('" alt="图片加载失败"></a></div>'));
        }
    }
    $("#rotation-chart")[0].innerHTML = html;
    var swiper = new Swiper('.swiper-container-index', {
        effect: 'cube',
        grabCursor: true,
        speed:2000,
        autoplay:true,
        loop : true,
        loopAdditionalSlides : 2,
        // autoplayDisableOnInteraction : false,
        autoplay:{disableOnInteraction:false},
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    
    });
    /*
    console.log("Sssssssssssssssssssssssssss")
    console.log(data);

    $(data).each(function(i,val){
        console.log(val);
        $('#rotation-img').append($('<div class="swiper-slide"><a class="external swiper-wrapper-body" onclick="goDetails(\'.concat(val.id).concat(\')"><img src="\'.concat(val.imgUrl1).concat(\'" alt="图片加载失败"></a></div'));
        }
    });*/



}

$(".category-name")[0].onclick = function () {
    window.location.href = "search.html";
}

/**
 * 保存类型跳转
 *
 * @param type
 */
function getTypeCategoties(type) {
    localStorage.setItem("bookType", type);
    window.location.href = "search.html";
}

/**
 * 跳转到书的详情页面
 *
 * @param bookId
 */
function goDetails(bookId) {
    localStorage.setItem("bookId", bookId);
    window.location.href = "product_details.html";
}