<template>
  <div>
    <h1>Hi {{username}}, Your on Public Room</h1>
    <center>
      <div class="row container mt-3"
      style="justify-content:center"
      >
      <div class="col-1 userboard"
       v-for="(user,i) in dataUser"
       :key="i">
        <div>{{user.username}}</div>
        <div>{{user.score}}</div>
      </div>
    </div> 
    </center> 
    <Board
    @addScoreUser="addScoreUser"
    ></Board>
  </div>
</template>

<script>
import Board from '../components/Board'
export default {
  
  name:'Lounge',
  data () { 
    return {
      dataUser:[]
    }
  },
  methods:{
    addScoreUser(){
      console.log('masuk emit vue')
      this.$socket.emit('add_score',{username:localStorage.username})
    }
  },
  components:{
    Board
  },
  sockets: {
    get_data: function (data) {
      this.dataUser = data
      console.log(data,'datadari socket')
    },
    get_user: function (data) {
      this.dataUser = data
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  created () {
    console.log('masuk created lounge')
    this.$socket.emit('get_user_data')
  }
}
</script>

<style lang="scss">
h1 {
    text-align: center;
    color: white;
}
.userboard{
  color: white;
}
</style>
