<template>
  <div class="sec game-dashboard">
    <div class="leaderboard">

      <h2 class="title">Leader Board:</h2>
      <div class="all-joined row container mt-3" style="justify-content:center">
        <div class="card player-card" v-for="(user, i) in dataUser" :key="i">
          <h2>{{ user.username }}</h2>
          <h4>score: {{ user.score }}</h4>
        </div>
      </div>
    </div>
    <div class="sec gamePlay">
    <Board @addScoreUser="addScoreUser" @finish="finish"></Board>
    </div>
  </div>
</template>

<script>
import Board from '../components/Board'
import router from '../router'
export default {
  name: 'Lounge',
  data () {
    return {
      dataUser: []
    }
  },
  methods: {
    addScoreUser () {
      this.$socket.emit('add_score', { username: localStorage.username })
    },
    finish () {
      let winner = {
        score: 0
      }
      let showScore = null
      let notes = 'Boards:'
      this.dataUser.forEach((el) => {
        if (el.score > winner.score) {
          winner = el
          showScore = el.score
        }
        notes += `<br> ${el.username} : ${el.score}`
      })
      if (winner.username === this.username) {
        Swal.fire({
          title: `Congratulation ${this.username},`,
          html: `you've Won with ${showScore} hit!! <br><br> ${notes}`,
          allowOutsideClick: false
      })
      } else {
        Swal.fire({
          title:`Sorry ${this.username}, you've Lost!!`,
          html: notes,
          allowOutsideClick: false
        })
      }
      this.$socket.emit('finish_game')
      localStorage.removeItem('username')
      router.push({ path: '/' })
    }
  },
  components: {
    Board
  },
  sockets: {
    get_data: function (data) {
      this.dataUser = data
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
    this.$socket.emit('get_user_data')
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Bangers');
$main-font :'Bangers', cursive;

.game-dashboard {
  display: flex;

  .leaderboard {
    min-width: 30%;
    text-align: center;

    .title {
      font-family: $main-font;
      color: white;
    }

    .all-joined {
     overflow: scroll;
      max-height: 95vh;
      display: flex;
      align-items: center;
      flex-direction: column;
      flex-wrap: wrap;
      font-family: $main-font;
      
      &::-webkit-scrollbar {
        display: none;
      } 

      .card {
        margin-top: 10px;
        background: none;
        border-color: white;
        border-width: 3px 3px 5px 5px;
        border-radius:4% 95% 6% 95%/95% 4% 92% 5%;
        transform: rotate(-2deg);

        &:hover {
        transform: rotate(-4deg);
        }
      }

      .player-card {
        text-align: center;
        min-width: 200px;
        min-height: 100px;
        max-width: 300px;

        h2 {
          padding: 10px;
          color: white;
        }

        h4 {
          padding: 10px;
          color: white;
        }
      }
    }
  }
}

h1 {
  text-align: center;
  color: white;
      font-family: $main-font;

}
.userboard {
  color: white;
}
</style>
