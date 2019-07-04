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
$('#feature').on('change',function () {
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
      // location.href = "posts.html"
    },
    error:function(err){
      console.log(err)
    }
  })
  return false
})