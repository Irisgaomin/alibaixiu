// 轮播图列表展示
$.ajax({
  type:'get',
  url:'/slides',
  success:function(result){
    let html = template('sliderTpl',{data:result})
    $('#slideBox').html(html)
  }
})

// 图片上传和预览功能
$('#myFile').on('change',function(){
  let formData = new FormData()
  formData.append('avatar',this.files[0])
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    contentType:false,
    processData:false,
    success:function(result){
      $('#preview').attr('src',result[0].avatar).show()
      $('#hiddenImg').val(result[0].avatar)
    }
  })
})
// 轮播图添加功能
$('#sliderForm').on('submit',function(){
  $.ajax({
    type:'post',
    url:'/slides',
    data:$(this).serialize(),
    success:function(result){
      location.reload()
    }
  })
  return false
})
// 删除轮播图
$('#slideBox').on('click','#delete',function(){
  let id = $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/slides/' + id,
    success:function(result){
      location.reload()
    }
  })
})