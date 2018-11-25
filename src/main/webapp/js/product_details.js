window.onload = function () {
  getProductSwiper();// 获取宝贝轮播图
  getProductDetail();//获取产品详情参数
  addCart();// 加入购物车
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

/**
 * Web Storage本地存储
 * 1.两个接口：分别是localStorage和sessonStorage
 * 2.四个函数：分别是setItem、getItem、removeItem和clear
 *   A. localStorage.setItem      存储数据信息到本地localStorage.setItem(键名，键值)
 *   B. localStorage.getItem      读取本地存储的信息localStorage.getItem(键名)
 *   C. localStorage.removeItem   删除本地存储的信息localStorage.removeItem(键名)
 *   D. localStorage.clear        清空所以存储的信息localStorage.clear()
 * 3.封装后的
 *   A. localStorage.setItem      存储数据信息到本地myStorage.setItem(键名，键值)
 *   B. localStorage.getItem      读取本地存储的信息myStorage.getItem(键名)
 *   C. localStorage.removeItem   删除本地存储的信息myStorage.removeItem(键名)
 *   D. localStorage.clear        清空所以存储的信息myStorage.clear()
 */
// 加入购物车
function addCart(){

}

myStorage.setItem("coffeeType", "mocha");
myStorage.setItem("coffeePrice", "28");
    verify();   //验证本地存储
    myStorage.removeItem("coffeeType");
    verify();   //验证coffeeType是否存在
    myStorage.clear();
    verify();   //验证coffeeType和coffeePrice是否存在
 
    //自定义验证函数，验证coffeeType和coffeePrice的数据是否存在
    function verify(){
        var type = myStorage.getItem("coffeeType");
        var price =myStorage.getItem("coffeePrice");
        type = type ? type : '不存在';
        price = price ? price : '不存在';
        alert( "coffeeType: " + type + "\n\n" + "coffeePrice: " + price );
    }

