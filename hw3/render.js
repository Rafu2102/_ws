export function layout(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="zh-Hant">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: 'Microsoft JhengHei', '微軟正黑體', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        h1 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        h2 {
          color: #2980b9;
        }
        .post-time {
          color: #7f8c8d;
          font-size: 0.9em;
        }
        .post-link {
          color: #e74c3c;
          text-decoration: none;
        }
        .post-link:hover {
          text-decoration: underline;
        }
        form input[type="text"],
        form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #bdc3c7;
          border-radius: 4px;
        }
        form input[type="submit"] {
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        form input[type="submit"]:hover {
          background-color: #27ae60;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
  `;
}

export function list(user, posts) {
  let list = [];
  for (let post of posts) {
      const formattedDate = post.created_at;
      list.push(`
      <li>
        <h2>${post.title}</h2>
        <p><a class="post-link" href="/${user}/post/${post.id}">閱讀全文</a></p>
        <p class="post-time">發布時間：${formattedDate}</p>
      </li>
      `);
  }
  let content = `
    <h1>${user} 的部落格文章列表</h1>
    <p>目前共有 <strong>${posts.length}</strong> 篇文章</p>
    <p><a href="/${user}/post/new" class="post-link">撰寫新文章</a></p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
  `;
  return layout(`${user} 的部落格`, content);
}

export function newPost(user) {
  return layout('撰寫新文章', `
    <h1>撰寫新文章</h1>
    <p>請在下方填寫您的新文章內容。</p>
    <form action="/${user}/post" method="post">
      <p><input type="text" placeholder="文章標題" name="title" required></p>
      <p><textarea placeholder="文章內容" name="body" required></textarea></p>
      <p><input type="submit" value="發布文章"></p>
    </form>
  `);
}

export function show(user, post) {
  const formattedDate = post.created_at;
  return layout(post.title, `
    <h1>${post.title}</h1>
    <div>${post.body}</div>
    <p class="post-time">發布時間：${formattedDate}</p>
    <p><a href="/${user}/" class="post-link">返回文章列表</a></p>
  `);
}
