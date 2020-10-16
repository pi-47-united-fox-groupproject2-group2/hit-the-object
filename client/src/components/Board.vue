<template>
  <div>
    <h1>Hit the Shape!</h1>
    <center class="main">
      <!-- <h2>Your score: <span id="score">{{ score }}</span></h2> -->

      <h2><span id="time-left">{{ timer }}</span> Seconds left</h2>
      
      <div id="start" v-if="!started">
       <button class="start-button" @click="onStartButtonHandler()">Start</button>
      </div>

      <div class="grid">
        <div
          v-for="buttonNumber in 9"
          :key="buttonNumber"
          :class="buttonClass(buttonNumber)"
          @click.prevent="answer(buttonNumber)"
        ></div>
      </div>
    </center>

  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 10,
      score: 0,
      currentNumber: 0,
      randomNumber:1,
      started: false
    };
  },
  sockets:{
    start_game_go: function(){
      this.start()
    },
    get_random_number: function(data){
      this.randomNumber = data
    }
  },
  methods: {
    answer(number) {
      if (number == this.currentNumber) {
        this.score++;
        this.$emit('addScoreUser')
        this.setRandomNumber();
      }
    },
    onStartButtonHandler() {
      this.$socket.emit('start_game')
    },
    start() {
      // this.$socket.emit('start_game')
      this.started = true
      let time = setInterval(() => {
        this.countDown();
      }, 1000);
      let randomPos = setInterval(() => {
        this.setRandomNumber();
      }, 500);
      setTimeout(() => {
        clearInterval(time);
        clearInterval(randomPos);
      }, 11000);
    },
    countDown() {
      this.timer--;
    },
    setRandomNumber() {
      // this.currentNumber = Math.floor(Math.random() * 9 + 1);
      this.$socket.emit('get_random_number')
      this.currentNumber = this.randomNumber
    },
    buttonClass(number) {
      let classNames = ["square"];
      if (number == this.currentNumber) {
        classNames.push("mole");
      }
      return classNames;
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Bangers');
$main-font :'Bangers', cursive;

h2 {
  font-family: $main-font;

  span {
    font-weight: 900;
  }
}

.main {
  color: white;
}

.square {
  width: 100px;
  height: 150px;
}

.grid {
  width: 700px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;

  div {
  flex: 0 0 30%;
  margin: 10px;
  }
}

.mole {
  background-color: white;
  border-width: 3px 3px 5px 5px;
  border-radius:4% 95% 6% 95%/95% 4% 92% 5%;
  transform: rotate(5deg);
  transition: 1s;

  &:hover {
    transform: rotate(-5deg);
  }
}

 #start { 
        transition: 0.4s;
        width: 100%;

        .start-button {
            background:#ddd;
            border:1px solid #222;
            box-shadow:3px 3px 0 #222;
            font-family: 'Bangers', cursive;
            margin: 1rem;
            width: 100px;
            font-size: 2rem;
            color: #222;
            transition: 0.4s;
            text-decoration: none;

            &:active {
              transform: scale(0.5);
        }
        }
    }
</style>
