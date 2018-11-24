window.onload = function () {
  getStoreSwiper();//获取店铺轮播图
  getStoreProductList();//获取店铺宝贝列表
}

//获取店铺轮播图
function getStoreSwiper(){
  $.ajax({
    type:"",
    url: '',
    dataType:"json",
    success:function(data){
      var swiperWrapperStore = document.getElementById('swiper-wrapper-store');
      console.log(data);
      $(data).each(function(i,val){
          var html = '';
              html = '<div class="swiper-slide"><a class="external swiper-wrapper-body" href=""><img src="../../img/loading.jpg" alt="图片加载失败"></a></div>'
              swiperWrapperStore.innerHTML = html;
      });
      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
      });
    }
  })
}

//获取店铺宝贝列表
function getStoreProductList(){
  $.ajax({
    type:"",
    url: '',
    dataType:"json",
    success:function(data){
      var categoriesStoreList = document.getElementById('categories-store-list');
      console.log(data);
      $(data).each(function(i,val){
          var html = '';
              html = '<a class="external category-list" href="product_details.html" ><div class="category-list-img"><img src="../../img/loading.jpg" alt="failed" /><div class="category-name category-list-name">图书列表</div></div></a>'
              categoriesStoreList.innerHTML = html;
      });
     
    }
  })
}

/**
 * @author chgl16
 * @param ev
 */
