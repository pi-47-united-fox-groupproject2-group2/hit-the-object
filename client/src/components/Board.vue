<template>
  <div>
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
    <div class="start-button-div">
      <button class="btn btn-lg btn-dark" @click="start()">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 60,
      score: 0,
      currentNumber: 0,
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
      this.countDown();
      this.randomMove(this.timer * 1000 + 1000);
    },
    countDown() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer--;
          this.countDown();
        }, 1000);
      }
    },
    randomMove(totalTime) {
      let interval = setInterval(() => {
        this.setRandomNumber();
      }, 600);
      setTimeout(() => {
        clearInterval(interval);
      }, totalTime);
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
    },
  },
};
</script>

<style>
.start-button-div {
  display: flex;
  justify-content: center;
}

.square {
  width: 200px;
  height: 200px;
  border-style: solid;
  border-color: white;
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
  background-image: url("../assets/mole.png");
  background-size: 125% 100%;
}
</style>
