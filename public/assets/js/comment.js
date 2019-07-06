render()
function render() {
  $.ajax({
    type:'get',
    url:'/comments',
    data:{page},
    success:function(result){
      let html = template('commentTpl',{data:result})
      $('#commentBox').html(html)
      let pageHtml = template('pageTpl',result)
      $('#page').html(pageHtml)
    }
  })
}
// 处理时间格式
function dateformat (data) {
  date = new Date(data)
  return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))  + '-' + (date.getDate() < 10 ? '0' + date.getDate() :date.getDate())
}
// 修改评论状态
$('#commentBox').on('click','.status',function(){
  let id = $(this).attr('data-id')
  let status = $(this).attr('data-status')
  $.ajax({
    type:'put',
    url:'/comments/' + id,
    data:{
      state: status == 0 ? 1 :0
    },
    success:function(result){
      location.reload()
    }
  })
})
// 删除评论
$('#commentBox').on('click','#delete',function(){
  let id = $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/comments/' + id,
    success:function(result){
      location.reload()
    }
  })
})
 var page = 1
// 实现分页功能
function changePage(currentPage) {
  page = currentPage
  render()
}