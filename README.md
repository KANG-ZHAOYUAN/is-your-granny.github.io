# KANG-ZHAOYUAN.github.io

## 项目简介

这个仓库是我用来练习创建网站的项目。它没有其他特殊的用途，主要作为个人学习和实验的平台。通过这个仓库，我在不断尝试和提升网页开发技能。

## 项目目的

- 学习 HTML、CSS、JavaScript 等前端技术。
- 熟悉 Git 和 GitHub 的使用。
- 练习如何通过 GitHub Pages 部署静态网站。

## 项目结构

- **index.html**: 网站的主页，包含一个用于显示日期的元素（`id="date_display"`）。
- **get_date.js**: JavaScript 脚本，调用 News API 获取最新文章时间作为日期、负责自动刷新以及失败时的回退处理。
- **README.md**: 项目说明文件。

## 使用说明

1. 克隆仓库到本地：
   ```bash
   git clone git@github.com:KANG-ZHAOYUAN/KANG-ZHAOYUAN.github.io.git
   ```

2. 本地运行：
   - 直接在浏览器中打开 `index.html`（部分浏览器可能限制跨域请求）。
   - 或使用简单 HTTP 服务器，例如：`python -m http.server 8000`，然后访问 `http://localhost:8000`。

---

## 网站功能

- 显示 “今天是：YYYY年MM月DD日”，日期来源于 News API（使用第一篇新闻的 `publishedAt` 字段）。
- 自动刷新：默认每 60 秒重新请求并更新页面（可在 `get_date.js` 中调整）。
- 失败回退：当请求失败或返回数据无效时，页面会显示：
  > 失败，显示本地时间：YYYY年MM月DD日（已停止自动刷新）
  并停止后续的自动刷新请求，避免触发 API 速率限制。
- 错误信息会输出到浏览器控制台，便于调试。

## 算法说明

- 编码方式：使用**Base-4（四进制）**映射把任意明文转换为密文符号。密文字母表为：`["是", "你", "奶奶", "！"]`，对应数值 `[0, 1, 2, 3]`。
- 加密流程（`cipher.js` 中的 `handleEncrypt()`）：
  1. 使用 `TextEncoder` 将明文编码为 UTF-8 字节数组（Uint8Array）。
  2. 将字节数组视为一个大整数 D（按大端顺序把每个字节累乘 256 并加上字节值，即 D = D * 256 + byte）。
  3. 把大整数 D 转为四进制（base-4）表示，得到一串 0-3 的数字。将每位数字映射为对应的符号，拼接得到密文字符串。
  4. 对多字符符号（如 "奶奶"）的处理在解密时需要优先匹配以避免歧义。
- 解密流程（`cipher.js` 中的 `handleDecrypt()`）：
  1. 按符号序列把密文解析为 base-4 的数值序列，优先检查双字符符号 "奶奶"，其余按单字符匹配。
  2. 把这些数值按位累乘 base-4 得到大整数 D。
  3. 将 D 反向拆分为 base-256 的字节序列（取余 256，反向重建字节数组）。
  4. 使用 `TextDecoder('utf-8')` 将字节数组解码回字符串明文。
- 注意事项：该方法是演示性质的编码/映射机制，不适合作为安全加密方案（没有密钥管理、没有随机化/认证）。

## 网页生成与运行逻辑

- 页面结构：`index.html` 包含一个用于显示日期的元素 `#date_display`，并加载 `get_date.js`（显示日期）和可选的 `cipher.js`（加解密交互）。
- 获取并显示逻辑（`get_date.js`）：
  1. 向 News API 发起请求（`news_api_url`），检测 `response.ok` 并解析 JSON。
  2. 验证返回数据的有效性（`data.articles[0].publishedAt`），把该时间作为“今天”的来源。
  3. 用 `format_date()` 把 `Date` 对象格式化为 `YYYY年MM月DD日` 的中文字符串，并更新 `#date_display` 的 `innerHTML`。
  4. 自动刷新：通过 `setInterval(fetch_and_display_today_date, 60 * 1000)` 每 60 秒重新请求并刷新显示（返回值保存在 `refreshInterval` 以便控制）。
  5. 失败回退：当请求失败或数据不合法时，调用 `format_date(new Date())` 显示本地时间，并 `clearInterval(refreshInterval)` 停止后续自动刷新，避免继续消耗 API 配额。
- 调试信息：所有网络或解析错误均会 `console.error(...)` 打印到浏览器控制台，方便排查。

## 配置与注意事项

- 在 `get_date.js` 中设置 `api_key` 为你的 News API Key（在文件顶部）。
- 注意 News API 的请求配额与速率限制；减少刷新频率或使用缓存可以避免达限。
- 如需更改自动刷新的间隔，请修改文件中 `setInterval` 的间隔值（以毫秒为单位）。

---

## 故障排查 — 编码问题

如果页面出现中文乱码（例如看到不正常的符号而不是中文），通常是文件编码不匹配导致的。解决方法：

- 在代码编辑器（例如 VS Code）中确认并将所有项目文件（`index.html`、`get_date.js` 等）保存为 **UTF-8（无 BOM）**。
- 在 VS Code 中：右下角编码处点击 → 选择 “Reopen with Encoding” 验证内容 → 然后 “Save with Encoding” 选择 `UTF-8`。
- 若使用服务器，请确保服务器响应头包含 `Content-Type: text/html; charset=utf-8`。


