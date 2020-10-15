<template>
  <div>
    <h1>Whack a mole!</h1>

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

    <button class="btn btn-lg btn-dark" @click="start()">Start</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 60,
      score: 0,
      currentNumber: 0
    };
  },
  methods: {
    answer(number) {
      if (number == this.currentNumber) {
        this.score++;
        this.setRandomNumber();
      }
    },
    start() {
      let time = setInterval(() => {
        this.countDown();
      }, 1000);
      let randomPos = setInterval(() => {
        this.setRandomNumber();
      }, 500);
      setTimeout(() => {
        clearInterval(time);
        clearInterval(randomPos);
      }, 61000);
    },
    countDown() {
      this.timer--;
    },
    setRandomNumber() {
      this.currentNumber = Math.floor(Math.random() * 9 + 1);
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
