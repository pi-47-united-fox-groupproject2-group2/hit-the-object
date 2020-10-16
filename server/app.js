const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000


let listUser = []

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

io.on('connection', (socket) => {
  io.emit('user_Connected',{message:'welcome to socket'})

  //get data

  socket.on('get_user_data', ()=>{
    io.emit('get_data', listUser)
  })

  // tangkep new user
  socket.on('emit_new_user', (data)=>{
    listUser.push(data)
    io.emit('get_user', listUser)
  })

  socket.on('add_score', (data)=>{
    listUser.forEach(val=>{
      if(val.username === data.username){
        val.score++
      }
    })
    io.emit('get_user', listUser)
  })

  socket.on('start_game', ()=>{
    io.emit('start_game_go')
  })

  //get random number
  socket.on('get_random_number', ()=>{
    let random = Math.floor(Math.random() * 9 + 1);
    io.emit('get_random_number', random)
  })

  socket.on('finish_game', ()=>{
    listUser = []
    io.emit('get_user', listUser)
  })
});

  
http.listen(port, () => {
console.log(`listening on *:${port}`);
});