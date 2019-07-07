$('#myFile').on('change',function () {
  let formData = new FormData()
  formData.append('logo',this.files[0])
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    contentType:false,
    processData:false,
    success:function(result){
      $('#preview').attr('src',result[0].logo)
      $('#hiddenImg').val(result[0].logo)
    }
  })
})
$('#setBox').on('submit','#setForm',function(){
  $('#comment').val($('#comment').prop('checked'))
  $('#review').val($('#review').prop('checked'))
  $.ajax({
    type:'post',
    url:'/settings',
    data:$(this).serialize(),
    success:function(result){
      alert('修改成功')
    }
  })
  return false
})

$.ajax({
  type:'get',
  url:'/settings',
  success:function(result){
    if(result){
      $('#preview').attr('src',result.logo)
      // $('#hiddenImg').val('avatar',result.logo)
      $('#comment').val(result.comment);
      $('#review').val(result.review);
    }
  }
})