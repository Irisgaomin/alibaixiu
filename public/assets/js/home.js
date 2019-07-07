// 轮播图
$.ajax({
  type:'get',
  url:'/slides',
  success:function(result){
    let html = template('sliderTpl',{data:result})
    $('#sliderBox').html(html)
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;
        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });
    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);
      if(_this.is('.prev')) {
        swiper.prev();
      } else if(_this.is('.next')) {
        swiper.next();
      }
    })
  }
})

// 最新发布
$.ajax({
  type:'get',//get或post
  url:'/posts/lasted',//请求的地址
  success:function(result){//成功的回调函数
    let html = template('newTpl',{data: result})
    $('.new').append(html)
  }
})