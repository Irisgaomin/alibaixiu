// 显示所属分类数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    let html = template('postTpl',{data:result})
    $('#category').html(html)
  }
})

// 实现图片上传和预览
// $('#feature').on('change',function () {
  
// })
$('#formBox').on('change','#feature',function () {
  let formData = new FormData()
  formData.append('avatar',this.files[0])
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    contentType:false,
    processData:false,
    success:function(result){
      $('.thumbnail').attr('src',result[0].avatar).show()
      $('#thumbnail').val(result[0].avatar)
    }
  })
})

// 文章上传
$('#addPost').on('submit',function(){
  let formData = $(this).serialize()
  console.log(formData)
  $.ajax({
    type:'post',
    url:'/posts',
    data:formData,
    success:function(result){
      console.log(result)
      location.href = "posts.html"
    }
  })
  return false
})


// 处理日期时间格式
function dateformat (data) {
  date = new Date(data)
  return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))  + '-' + (date.getDate() < 10 ? '0' + date.getDate() :date.getDate())
}

// 从浏览器中的地址栏中获取查询参数
function getUrlParams(name) {
  let paramsAry = location.search.substr('1').split('&')
  for(let i = 0; i < paramsAry.length; i++){
    let temp = paramsAry[i].split('=')
    if(temp[0] = name) {
      return temp[1]
    }
  }
}

// 获取id值，如果id存在，则是添加文章，否则是修改文章
let id = getUrlParams('id')
if (id !== -1) {
  $.ajax({
    type:'get',
    url:'/posts/' + id,
    success:function(result){
      $.ajax({
        type:'get',
        url:'/categories',         
        success:function(response){
          // 获取分类数据
          result.categories = response
              // 修改页面数据模板
          let html = template('editTpl',{data: result})
          $('#formBox').html(html)
          if(result.thumbnail){
            $('.thumbnail').attr('src',result.thumbnail).show()
          }
        }
      })
    }   
  })
} else {
  // 添加文章
}

// 通过事件委托给修改表单添加提交事件
$('#formBox').on('submit','#editPost',function(){
  let id = $(this).attr('data-id')
  $.ajax({
    type:'put',
    url:'/posts/' + id,
    data:$(this).serialize(),
    success:function(result){
      console.log(result)
      location.href = 'posts.html'
    }
  })
  return false
})