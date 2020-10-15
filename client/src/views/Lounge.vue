<template>
  <div>
    <h1>Hi {{ username }}, Your on Public Room</h1>
    <div class="board-div">
      <Board />
    </div>
  </div>
</template>

<script>
import Board from "@/components/Board.vue";
export default {
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  components: {
    Board,
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
  color: white;
}
.board-div {
  display: flex;
  justify-content: center;
  color: white;
}
</style>
