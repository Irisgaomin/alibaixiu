let key = getUrlParams('key')
$.ajax({
  type:'get',//get或post
  url:'/posts/search/' + key,//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
    let html = template('searchTpl',{data: result})
    $('#listBox').append(html)
    $('#listBox h3').html(result[0].category.title)
  }
})