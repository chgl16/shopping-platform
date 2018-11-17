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