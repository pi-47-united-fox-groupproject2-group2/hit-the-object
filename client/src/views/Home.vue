<template>
  <div class="home container">
      <input type="text" v-model="username">
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      username:'',
      dataUser:[]
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
    },
    scoreAdd () {
    this.$socket.emit('add_score',{username:localStorage.username})
  }
  }
}
</script>
