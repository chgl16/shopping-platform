var swiper = new Swiper('.swiper-container-index', {
      effect: 'cube',
      grabCursor: true,
      speed:2000,
      autoplay:true,
      loop : true,
      loopAdditionalSlides : 2,
      autoplayDisableOnInteraction : false,
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
        if (localStorage.getItem("roleType") != 2) {
            // 不是店主,去掉我的店铺功能
            $("#my_store").hide();
        }

    }
}

window.onload = function (ev) {
    fillUserMessage();
}