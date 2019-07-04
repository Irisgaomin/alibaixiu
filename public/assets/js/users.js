// 新增用户
$('#userForm').on('submit', function() {
  // 获取用户在表单中输入的内容并将内容格式化成参数字符串
  var formData = $(this).serialize()
  console.log(formData)
  // ajax发送添加用户请求
  $.ajax({
    type:'POST',//get或post
    url:'/users',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload()
    },
    error:function(err){
      alert('用户添加失败')
    }
  })
  // 阻止表单的默认提交行为
  return false
})
// 新增用户头像
$('#avatar').on('change',function(){
  var formData = new FormData() 
  formData.append('avatar',this.files[0])
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // 告诉ajax不要解析请求参数
    processData: false,
    // 告诉ajax不要设置请求参数的类型
    contentType: false,
    success:function(result){//成功的回调函数
      console.log(result)
      $('#preview').attr('src',result[0].avatar)
      $('#hiddenAvatar').val(result[0].avatar)
    }
  })
})