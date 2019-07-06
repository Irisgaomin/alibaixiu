// 文章数量
$.ajax({
  type:'get',
  url:'/posts/count',
  success:function(result){
    console.log(result)
    $('#post').html('<strong>'+ result.postCount +'</strong>篇文章（<strong>'+ result.draftCount +'</strong>篇草稿）')
  }
})
// 分类数量
$.ajax({
  type:'get',//get或post
  url:'/categories/count',//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
    $('#category').html('<strong>'+ result.categoryCount +'</strong>个分类')
  }
})
// 评论数量
$.ajax({
  type:'get',//get或post
  url:'/comments/count',//请求的地址
  success:function(result){//成功的回调函数
    $('#comment').html('<strong>' + result.commentCount + '</strong>条评论')
  }
})