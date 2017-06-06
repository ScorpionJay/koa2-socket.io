const Koa = require('koa')
const app = new Koa()

const router = require('koa-router')()
const static = require('koa-static')
const views = require('koa-views')


app.use(views('.'))


router.get('/test', async (ctx) => {
  await ctx.render('index')
})

router.get('/test1', async (ctx) => {
  await ctx.render('index1')
})

app.use( router.routes() )

// http://spathon.com/koa-js-and-socket-io/
const server = require('http').Server(app.callback())
const  io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
});

server.listen(3000,()=>{
	console.log('server started on port 3000!')
})