$('#logout').on('click', () => {
  // confirm（）弹出确认框,返回值是（确定）true或（取消）false
  var isConfirm = confirm('是否确认退出登录')
  if(isConfirm) {
    $.ajax({
      type:'post',//get或post
      url:'/logout',//请求的地址
      success:function(result){//成功的回调函数
        location.href = './login.html'
      },
      error:function(result){
        alert('退出失败')
      }
    })
  }
})