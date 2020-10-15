<template>
  <div>
      {{ countDown }}
  </div>
</template>

<script>
export default {
    name: 'Timer',
    data () {
        return {
            countDown : 20
        }
    },
    methods: {
        countDownTimer () {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        }
    },
    created () {
        this.countDownTimer()
    }
}
</script>

<style>

</style>