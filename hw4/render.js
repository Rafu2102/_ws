export function layout(title, content) {
    return `
      <!DOCTYPE html>
      <html lang="zh-Hant">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>${title}</title>
        <style>
          body { font-family: 'Microsoft JhengHei', sans-serif; line-height:1.6; margin:20px; background-color:#f5f5f5; color:#333; }
          h1 { border-bottom:2px solid #3498db; padding-bottom:10px; color:#2c3e50; }
          h2 { color:#2980b9; }
          a { color:#3498db; text-decoration:none; }
          a:hover { text-decoration:underline; }
          input[type=text], input[type=password], textarea { width:100%; padding:10px; margin-bottom:10px; border-radius:4px; border:1px solid #ddd; }
          input[type=submit] { background-color:#2ecc71; color:white; padding:10px; border:none; border-radius:4px; cursor:pointer; }
          input[type=submit]:hover { background-color:#27ae60; }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
}

export function signupUi() {
    return layout('註冊', `
        <h1>註冊</h1>
        <form action="/signup" method="post">
            <p><input type="text" name="username" placeholder="使用者名稱" required></p>
            <p><input type="password" name="password" placeholder="密碼" required></p>
            <p><input type="text" name="email" placeholder="電子郵件" required></p>
            <p><input type="submit" value="註冊"></p>
        </form>
    `);
}

export function loginUi() {
    return layout('登入', `
        <h1>登入</h1>
        <form action="/login" method="post">
            <p><input type="text" name="username" placeholder="使用者名稱"></p>
            <p><input type="password" name="password" placeholder="密碼"></p>
            <p><input type="submit" value="登入"></p>
        </form>
        <p>還沒有帳號？<a href="/signup">註冊</a></p>
    `);
}

export function success(message) {
    return layout('成功', `<h1>${message}</h1><a href="/">回到首頁</a>`);
}

export function fail(message) {
    return layout('失敗', `<h1>${message}</h1><a href="/">回到首頁</a>`);
}

export function list(posts, user) {
    let content = `
        <h1>文章列表</h1>
        ${(user == null ? '<a href="/login">登入</a> 發表文章！' : `歡迎 ${user.username}！<a href="/post/new">發表新文章</a> | <a href="/logout">登出</a>`)}
        <ul>${posts.map(post => `<li><h2>${post.title} - by ${post.username}</h2><a href="/post/${post.id}">閱讀更多</a></li>`).join('')}</ul>`;
    
    return layout('文章列表', content);
}

export function newPost() {
    return layout('發表新文章', `
        <h1>發表新文章</h1>
        <form action="/post" method="post">
            <p><input type="text" name="title" placeholder="標題"></p>
            <p><textarea name="body" placeholder="內容"></textarea></p>
            <p><input type="submit" value="發表"></p>
        </form>
    `);
}

export function show(post) {
    return layout(post.title, `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        <small>作者：${post.username}</small>
        <br><a href="/">回到首頁</a>
    `);
}
