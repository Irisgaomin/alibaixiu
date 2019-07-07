// 从浏览器中的地址栏中获取查询参数
function getUrlParams(name) {
  let paramsAry = location.search.substr('1').split('&')
  for(let i = 0; i < paramsAry.length; i++){
    let temp = paramsAry[i].split('=')
    if(temp[0] = name) {
      return temp[1]
    }
  }
  return -1
}
// 获取id值，如果id存在，则是添加文章，否则是修改文章
let id = getUrlParams('id')
if (id !== -1) {
  $.ajax({
    type:'get',
    url:'/posts/'+ id,
    success:function(result){
      let html = template('detailTpl',{data: result})
      $('#article').html(html)
    }
  })
}

// 点赞功能
$('#article').on('click','#like',function(){
  $.ajax({
    type:'post',
    url:'/posts/fabulous/' + id,
    success:function(result){
      alert('点赞成功')
    }
  })
})


// 评论功能
var review
$.ajax({
  type:'get',
  url:'/settings',
  success:function(result){
    review = result.review
    if(result.comment == true && (isNormalLogin  == true || isLogin == true)){
      let commentTpl = 
      `
        <form>
          <textarea></textarea>
          <input type="submit" value="提交评论">
        </form>
      `
      $('#comment').html(commentTpl)
    }
  }
})

var state
$('#comment').on('submit','form',function(){
  let content = $(this).find('textarea').val()
  if(review){
    state = 0
  } else {
    state = 1
  }
  $.ajax({
    type:'post',
    url:'/comments',
    data:{
      content,
      post: id,
      state,
    },
    success:function(result){
      alert('评论成功')
      location.reload()
    }
  })
  return false
})