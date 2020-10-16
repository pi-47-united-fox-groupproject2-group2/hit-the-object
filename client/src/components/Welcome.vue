<template>
  <div id="main-home">
    <div id="game-title">
        <h1>Hit The Shape</h1>
    </div>
    <div id="player-name">
        <input type="text" v-model="inputUserName" placeholder="player name" />
    </div>
    <div id="start">
        <a href="#" @click.prevent="onSubmitUser" class="start-button">Start</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHome',
  data () {
    return {
      inputUserName: ''
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  sockets: {
    // user_Connected: function (data) {
    //   console.log(data, '<><><><>')
    // },
    get_user: function (data) {
      this.dataUser = data
    }
  },
  methods: {
    onSubmitUser () {
      localStorage.setItem('username',this.inputUserName)
      this.$socket.emit('emit_new_user', { username: this.inputUserName, score: 0 })
      this.$store.commit('changeUsername', this.inputUserName)
      this.$router.push('/lounge')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');
@import url('https://fonts.googleapis.com/css?family=Bangers');

#main-home {
    font-family: 'Rock Salt', cursive;
    text-align: center;

    #game-title {
        padding-bottom: 5rem;

        h1 {
        padding: 3rem;
        font-size: 5rem;
        color: #d2d3c9;
        text-shadow: 3px 3px 0px rgba(255, 255, 255, 1);
        }
    }

    #player-name {
        padding: 1rem;

        input {
            text-align: center;
            padding: 0.2rem;
            background: none;
            outline: none;
            color: #fff;
            font-size: 2rem;
            border-width: 0 0 2px;
            transition: 1s;

            &:focus {
                border-color: #fff;
                border-width: 0 0 6px;
            }
        }
    }

    #start {
        margin-top: 2rem;
        .start-button {
            background:#ddd;
            border:1px solid #222;
            box-shadow:3px 3px 0 #222;

            font-family: 'Bangers', cursive;
            margin-top: 3rem;
            padding: 1rem;
            width: 200px;
            font-size: 2rem;
            color: #222;
            transition: 0.4s;
            text-decoration: none;

            &:hover {
                font-size: 2.5rem;
            }
        }
    }
}
</style>
