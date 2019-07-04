// 显示分类列表
$.ajax({
  type:'get',
  url:'/categories',
  success:function(result){
    let html = template('categotyTpl',{data:result})
    $('#categoryBox').html(html)
  }
})

// 添加分类
$('#addCategory').on('submit',function () {
  let formData = $(this).serialize()
  $.ajax({
    type:'post',
    url:'/categories',
    data:formData,
    success:function(result){
      location.reload()
    }
  })
  return false
})

// 修改分类
// 显示要修改的分类
$('#categoryBox').on('click','#edit',function () {
  let id= $(this).attr('data-id')
  $.ajax({
    type:'get',//get或post
    url:'/categories/' + id,//请求的地址
    success:function(result){//成功的回调函数
      let html = template('editTpl',{data:result})
      $('#formBox').html(html)
    }
  })
})
// 提交修改数据
$('#formBox').on('submit','#editCategory',function () {
  let id= $(this).attr('data-id')
  let formData = $(this).serialize()
  $.ajax({
    type:'put',
    url:'/categories/' + id,
    data:formData,
    success:function(result){
      location.reload()
    }
  })
  return false
})

// 删除分类
$('#categoryBox').on('click','#delete',function () {
  if(confirm('确认是否删除用户')){
    let id= $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/categories/' + id,
    success:function(result){
      location.reload()
    }
  })
  }
})
// 批量删除分类
$('#selectAll').on('change',function(){
  let bool = $(this).prop('checked')
  $('#categoryBox').find('.status').prop('checked',bool)

})
$('#categoryBox').on('change','.status',function () {
  if($('#categoryBox').find('.status').length == $('#categoryBox').find('.status').filter(':checked').length){
    $('#selectAll').prop('checked',true)
  } else {
    $('#selectAll').prop('checked',false)
  }
})