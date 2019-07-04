// 新增用户
$('#userForm').on('submit', function() {
  // 获取用户在表单中输入的内容并将内容格式化成参数字符串
  let formData = $(this).serialize()
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
// 新增用户头像及预览
$('#avatar').on('change',function(){
  let formData = new FormData() 
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

// 显示用户列表
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    let html = template('userTpl',{data: result})
    $('#usersBox').html(html)
  },
  error:function (err) {
    console.log(err)
  }
})

// 修改用户
// 显示要修改的用户信息
$('#usersBox').on('click','.edit',function () {
  let id = $(this).attr('data-id')
  $.ajax({
    type:'get',//get或post
    url:'/users/' + id,//请求的地址
    success:function(result){//成功的回调函数
      let html = template('editTpl',{data: result})
      console.log(html)
      $('#formBox').html(html)
    },
    error:function (err) {
      console.log(err)
    }
  })  
})
// 提交修改用户信息
$('#formBox').on('submit','#editForm',function() {
  // 获取用户在表单中输入的内容并将内容格式化成参数字符串
 let formData = $(this).serialize()
 let id = $(this).attr('data-id')
  // ajax发送添加用户请求
  $.ajax({
    type:'put',//get或post
    url:'/users/' + id,//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload()
    },
    error:function(err){
      alert('用户添加失败')
    }
  })
  return false
})
// 修改用户头像及预览
$('#formBox').on('change','#avatar',function(){
  let formData = new FormData() 
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

// 删除用户
$('#usersBox').on('click','.delete',function () {
  let id = $(this).attr('data-id')
  $.ajax({
    type:'delete',//get或post
    url:'/users/' + id,//请求的地址
    success:function(result){//成功的回调函数
      location.reload()
    },
    error:function (err) {
      console.log(err)
    }
  })  
})

//全选按钮选中时，tbody中的input全部选中，并显示批量删除按钮
$('#selectAll').on('change',function() {
  var bool = $(this).prop('checked')
  $('#usersBox').find('.status').prop('checked',bool)
  if(bool){
    $('#deleteMany').css('display','block')
  } else {
    $('#deleteMany').css('display','none')
  }
})
// 设置tbody中input全部选中时，全选按钮选中，并当input选中超过2个，显示批量删除按钮
$('#usersBox').on('change',function() {
  if($('#usersBox').find('.status').length == $('#usersBox').find('.status').filter(':checked').length){
    $('#selectAll').prop('checked',true)
  } else {
    $('#selectAll').prop('checked',false)
  }
  if($('#usersBox').find('.status').filter(':checked').length >= 2) {
    $('#deleteMany').show()
  } else {
    $('#deleteMany').hide()
  }
})
// 批量删除用户
$('#deleteMany').on('click',function(){
  if(confirm('确认是否批量删除')){
    let deleteMany = $('#usersBox').find('.status').filter(':checked')
    var arr = []
    deleteMany.each(function (i,ele) {
      arr.push($(ele).attr('data-id'))
    })
    $.ajax({
      type:'delete',//get或post
      url:'/users/' + arr.join('-'),//请求的地址
      success:function(result){//成功的回调函数
        location.reload()
      }
    })
  }
})