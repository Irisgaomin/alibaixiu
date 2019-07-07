// 随机推荐
$.ajax({
  type:'get',
  url:'/posts/random',
  success:function(result){
    let randomTpl = `
    {{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
    {{/each}}
    `
    let html = template.render(randomTpl,{data:result})
    $('#randomBox').html(html)
  }
})

// 最新评论
$.ajax({
  type:'get',
  url:'/comments/lasted',
  success:function(result){
    let commentTpl = `
    {{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <div class="avatar">
            <img src="uploads/avatar_1.jpg" alt="">
          </div>
          <div class="txt">
            <p>
              <span>鲜活</span>{{$value.createAt.split('T')[0]}}说:
            </p>
            <p>{{$value.content.substr(0,10)}}</p>
          </div>
        </a>
      </li>
    {{/each}}
    `
    let html = template.render(commentTpl,{data:result})
    $('#commentBox').html(html)
  }
})

// 导航显示
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    let navTpl = 
    `
      {{each data}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa fa-glass"></i>{{$value.title}}</a></li>
      {{/each}}
    `
    let html = template.render(navTpl,{data:result})
    $('#navBox').html(html)
  }
})

// 从浏览器中的地址栏中获取查询参数
function getUrlParams(name) {
  let paramsAry = location.search.substr('1').split('&')
  for(let i = 0; i < paramsAry.length; i++){
    let temp = paramsAry[i].split('=')
    if(temp[0] = name) {
      return temp[1]
    }
  }
  return -1
}

// 搜索文章功能
$('.search form').on('submit',function(){
  let key = $(this).find('.keys').val()
  location.href = 'search.html?key=' + key
  return false
})