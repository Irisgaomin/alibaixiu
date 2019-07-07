// 热门推荐
$.ajax({
  type:'get',
  url:'/posts/recommend',
  success:function(result){
    let recommendTpl = `
    {{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
    {{/each}}
    `
    let html = template.render(recommendTpl,{data:result})
    $('#recommendBox').html(html)
  }
})