import { Application, Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import * as render from './render.js';

const userPosts = {};

const router = new Router();

router
  .get('/:user/', list)
  .get('/:user/post/new', add)
  .get('/:user/post/:id', show)
  .post('/:user/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  const user = ctx.params.user;
  const posts = userPosts[user] || [];
  ctx.response.body = await render.list(user, posts);
}

async function add(ctx) {
  const user = ctx.params.user;
  ctx.response.body = await render.newPost(user);
}

async function show(ctx) {
  const user = ctx.params.user;
  const id = parseInt(ctx.params.id);
  const posts = userPosts[user] || [];
  const post = posts[id];
  if (!post) ctx.throw(404, '找不到該文章');
  ctx.response.body = await render.show(user, post);
}

async function create(ctx) {
  const user = ctx.params.user;
  const body = ctx.request.body();

  if (body.type === "form") {
    const formData = await body.value;
    const post = {};

    for (const [key, value] of formData) {
      post[key] = value;
    }

    console.log('post=', post);

    if (!userPosts[user]) {
      userPosts[user] = [];
    }

    const id = userPosts[user].push(post) - 1;
    post.created_at = new Date().toLocaleString();
    post.id = id;

  
    ctx.response.redirect(`/${user}/post/${id}`);
  } else {
    ctx.throw(400, '請求類型錯誤，僅支援表單提交');
  }
}

console.log('伺服器運行於 http://127.0.0.1:8000');
await app.listen({ port: 8000 });
