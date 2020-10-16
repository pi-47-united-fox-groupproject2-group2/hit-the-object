<template>
  <div>
    <Welcome/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '../components/Welcome'

export default {
  name: 'Home',
  components: {
    Welcome
  },
  data () {
    return {
      username: '',
      dataUser: []
    }
  }
}
</script>
