<template>
  <div id="app">
    <vue-page-transition name="flip-y">
      <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
export default {
  sockets: {
    user_Connected: function (data) {
      
    },
    get_user: function (data) {
      this.dataUser = data
    }
  }
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
