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