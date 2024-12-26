import { Application, Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import * as render from './render.js'

const posts = [
  {id: 0, title: '春天的櫻花', body: '櫻花紛飛，美不勝收', created_at: new Date().toLocaleString()},
  {id: 1, title: '夏日的海灘', body: '陽光、沙灘、海浪，完美的夏日', created_at: new Date().toLocaleString()}
];

const router = new Router();

router
  .get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const id = parseInt(ctx.params.id);
  const post = posts[id];
  if (!post) ctx.throw(404, '找不到該文章');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body
  if (body.type() === "form") {
    const pairs = await body.form() // body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('post=', post)
    const id = posts.push(post) - 1;
    post.created_at = new Date().toLocaleString();
    post.id = id;
    ctx.response.redirect('/');
  }
}

console.log('伺服器運行於 http://127.0.0.1:8000')
await app.listen({ port: 8000 });
