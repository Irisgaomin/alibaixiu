// 显示文章列表
var page = 1
render()

// 处理日期时间格式
function dateformat (data) {
  date = new Date(data)
  return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))  + '-' + (date.getDate() < 10 ? '0' + date.getDate() :date.getDate())
}

// 分页功能实现
function changePage(currentPage) {
  page = currentPage
  render()
}
// 渲染页面
function render() {
  $.ajax({
    type:'get',
    url:'/posts',
    data:{page},
    success:function(result){
      let html = template('postsTpl',{data:result})
      $('#postsBox').html(html)
      let pageHtml = template('pageTpl',result)
      $('#page').html(pageHtml)
    }
  })
}

// 渲染筛选的分类的数据
$.ajax({
  type:'get',
  url:'/categories',         
  success:function(result){
    let html = template('categoryTpl',{data: result})
    $('#categoryBox').html(html)
  }
})
// 实现文章的筛选功能
$('#filterForm').on('submit',function () {
  let formData = $(this).serialize()
  $.ajax({
    type:'get',
    url:'/posts',
    data:formData,
    success:function(result){
      let html = template('postsTpl',{data:result})
      $('#postsBox').html(html)
      let pageHtml = template('pageTpl',result)
      $('#page').html(pageHtml)
    }
  })
  return false
})
// 删除功能
$('#postsBox').on('click','#delete',function(){
  let id = $(this).attr('data-id')
  if(confirm('确认是否删除该用户')){
    $.ajax({
      type:'delete',
      url:'/posts/' + id,
      success:function(result){
        location.reload()
      }
    })
  }
})