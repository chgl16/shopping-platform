window.onload = function () {
  getProductSwiper();// 获取宝贝轮播图
  getProductDetail();//获取产品详情参数
}
// 获取宝贝轮播图
function getProductSwiper(){
  $.ajax({
    type:"",
    url: '',
    dataType:"json",
    success:function(data){
      var swiperWrapperIndex = document.getElementById('swiper-wrapper-index');
      console.log(data);
      $(data).each(function(i,val){
          var html = '';
              html = '<div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>'
              swiperWrapperIndex.innerHTML = html;
      });
      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        speed:2000,
        autoplay:true,
        loop : true,
        loopAdditionalSlides : 2,
        autoplayDisableOnInteraction : false,
      });
    }
  })
}


//获取产品详情参数
function getProductDetail(){
  $.ajax({
    type:"",
    url: '',
    dataType:"json",
    success:function(data){
      $('#product-price-num').innerHTML='';//产品价格
      $('#d-title').innerHTML='';//产品标题介绍
      $('.d-num').innerHTML='';//产品购买人数  
      $('.d-area').innerHTML='';//产品发货地
      var html = '';
          html +='<div><img class="store-img"  src="../../img/loading.gif" alt=""></div>';
          html +='<div class="product-store-name">巧艺天宫中国偶人唐人坊工厂京剧脸谱工艺品</div>';
          html +='<div class="store-btn">';
          html +='<a class="products-btn external" href="store_all.html"><span>全部宝贝</span></a>';
          html +='<a class="enter-store-btn external" href="store.html"><span>进店逛逛</span></a>';
          html +='</div>';
      $('#product-store').innerHTML = html;
     
    }
  })
}