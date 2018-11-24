window.onload = function () {
  fillUserMessage();//从localStorage中获取数据填充用户的个人信息
  getIndexSwiper();// 获取首页轮播图
  getcategories()////获取所有图书类别
  getListSwiper();// 获取首页列表店铺轮播图
}


//搜索键盘按下事件跳转到搜索页面
$('#search').mousedown(function(event) {
  window.location.href="search.html";
  console.log("search");
});

// 获取首页轮播图
function getIndexSwiper(){
  $.ajax({
    type:"",
    url: '',
    dataType:"json",
    success:function(data){
      var swiperWrapperIndex = document.getElementById('swiper-wrapper-index');
      console.log(data);
      $(data).each(function(i,val){
       //  <div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>
          var html = '';
              html = '<div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>'
              swiperWrapperIndex.innerHTML = html;
      });
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
    }
  })
}

//获取所有图书类别
function getcategories(){
    var categories = document.getElementById('categories');
    var html = '';
    html = '<a class="external category" href="category_list.html" ><div class="category-img"><img src="../../img/loading.jpg" alt="failed" /></div><div class="category-name">图书类别</div></a>';
    categories,innerHTML = html;
}

// 获取首页列表店铺轮播图
function getListSwiper(){
  $.ajax({
    type:"",
    url: '',
    dataType:"json",
    success:function(data){
      var swiperWrapperList = document.getElementById('swiper-wrapper-list');
      console.log(data);
      $(data).each(function(i,val){
       //  <div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>
          var html = '';
              html = '<div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>'
              swiperWrapperList.innerHTML = html;
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
    }
  })
}

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

