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
// 获取id值，如果id存在，则是添加文章，否则是修改文章
let id = getUrlParams('id')
if (id !== -1) {
  $.ajax({
    type:'get',
    url:'/posts/category/' + id,
    success:function(result){
          let html = template('listTpl',{data: result})
          $('#listBox').append(html)
          $('#listBox h3').html(result[0].category.title) 
        }
      })
} else {
  // 添加文章
}