import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {

  console.log('url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if(pathname == '/'){

    ctx.response.body =
    `
      <html>
        <body>
          <h1>Oak做的自我介紹</h1>
          <ul>
            <li><a href="/name">我的名字</a></li>
            <li><a href="/age">我的年齡</a></li>
            <li><a href="/gender">我的性別</a></li>
            <li><a href="https://youtu.be/ihcyqbFxC_4?si=TuUA32L4QBhKi6UZ">最近蠻喜歡的歌</a></li>
          </ul>
        </body>
      </html>
    `

  }else if (pathname == '/name') {

    ctx.response.body = '林明昌'

  } else if(pathname == '/age') {

     ctx.response.body = '19歳です'

  } else if(pathname == '/gender'){

    ctx.response.body = '男だよ'

  }else{
    ctx.response.status = 404
    ctx.response.body = 'Not Found!'
  } 
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 })
