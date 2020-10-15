<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    sockets: {
    user_Connected: function (data) {
      console.log(data, "dari APP")
    },
    get_user: function (data) {
      this.dataUser = data
    }
    },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
    background-image: url('./assets/bg.jpg');
    background-size: cover;
}
</style>
