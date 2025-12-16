const api_key = 'e43e60b60d8644a09e9722df8217786e';  // 替换为你自己的 API 密钥
const news_api_url = `https://newsapi.org/v2/everything?q=world&sortBy=publishedAt&apiKey=${api_key}`;  // 新闻 API 请求 URL

// 获取今天的日期并显示
function fetch_and_display_today_date() {
  fetch(news_api_url)
    .then(response => response.json())  // 解析返回的 JSON 数据
    .then(data => {
      // 提取第一条新闻的发布时间作为“今天”的日期
      const published_date = new Date(data.articles[0].publishedAt);
      const formatted_date = published_date.toLocaleDateString('zh-CN');  // 格式化日期为中文格式

      // 在页面中显示今天的日期
      document.getElementById('date_display').innerHTML = `今天是：${formatted_date}`;
    })
    .catch(error => {
      console.error('Error fetching news data:', error);  // 错误处理
    });
}

// 执行函数，获取并显示今天的日期
fetch_and_display_today_date();
