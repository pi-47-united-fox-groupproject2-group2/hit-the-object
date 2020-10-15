<template>
  <div>
    <h1>Hi {{username}}, Your on Public Room</h1>

  </div>
</template>

<script>
export default {
  computed: {
    username () {
      return this.$store.state.username
    }
  }
}
</script>

<style lang="scss">
h1 {
    text-align: center;
    color: white;
}
</style>
