<template>
  <div>
    <h1>Whack a mole!</h1>
    <center>
      <h2>Your score:</h2>
      <h2 id="score">{{ score }}</h2>

      <h2>Seconds left:</h2>
      <h2 id="time-left">{{ timer }}</h2>

      <div class="grid">
        <div
          v-for="buttonNumber in 9"
          :key="buttonNumber"
          :class="buttonClass(buttonNumber)"
          @click.prevent="answer(buttonNumber)"
        ></div>
      </div>

      <button v-show="isStart === false" class="btn btn-lg btn-dark" @click="onStartButtonHandler()">Start</button>
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
      isStart: false
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
      this.isStart = true
    },
    start() {
      // this.$socket.emit('start_game')
      let time = setInterval(() => {
        this.countDown();
      }, 1000);
      let randomPos = setInterval(() => {
        this.setRandomNumber();
      }, 500);
      setTimeout(() => {
        clearInterval(time);
        clearInterval(randomPos);
        this.randomNumber = 100;
        this.currentNumber = 100;
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

<style>
.square {
  width: 200px;
  height: 200px;
  border-style: solid;
  border-color: black;
}

.grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  width: 618px;
  height: 618px;
}

.mole {
  background-color: black;
  background-size: cover;
}
</style>
