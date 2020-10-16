<template>
  <!-- <div class="home container">
      <input type="text" v-model="username">
      <div>{{ usernameStore }}</div>
      <button @click.prevent="onSubmitUser">submit username</button>
      <div class="container row">
        <div class="col-4" 
        v-for="(user,i) in dataUser"
        :key="i"
        >
          <div>{{user.username}}</div>
          <div>{{user.score}}</div>
        </div>

      </div>
        <button class="btn btn-primary" @click.prevent="scoreAdd">add</button>
        {{ countDown }}
  </div> -->
  <div>
    <Welcome/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '../components/Welcome'

export default {
  name: 'Home',
  components:{
    Welcome
  },
  data () {
    return {
      username:'',
      dataUser:[],
      countDown: 20
    }
  },
  sockets:{
    user_Connected: function (data) {
      console.log(data,'<><><><>')
    },
    get_user: function(data) {
      this.dataUser=data
    }
  },
  methods:{
    onSubmitUser () {
      localStorage.setItem('username',this.username)
      this.$socket.emit('emit_new_user',{username:this.username,score:0})
      this.$store.commit('changeUsername', this.username)
      
    },
    scoreAdd () {
      this.$socket.emit('add_score',{username:localStorage.username})
    },
    countDownTimer () {
      if(this.countDown > 0) {
        setTimeout(() => {
            this.countDown -= 1
            this.countDownTimer()
        }, 1000)
      }
    }
  },
  computed:{
    usernameStore(){
      return this.$store.state.username
    }
  },
  created () {
    this.countDownTimer()
  }
}
</script>
