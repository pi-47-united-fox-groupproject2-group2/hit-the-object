const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


let listUser = []

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

io.on('connection', (socket) => {
console.log('a user connected');
  io.emit('user_Connected',{message:'welcome to socket'})

  //get data

  socket.on('get_user_data', ()=>{
    io.emit('get_data', listUser)
  })

  // tangkep new user
  socket.on('emit_new_user', (data)=>{
    listUser.push(data)
    console.log (data)
    io.emit('get_user', listUser)
  })

  socket.on('add_score', (data)=>{
    console.log('masuk add_score',data)
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
});

  
http.listen(3000, () => {
console.log('listening on *:3000');
});