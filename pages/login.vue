<template>
  <div class="">
    <input class="c-input" placeholder="input your name" type="text" v-model="userName">
    <v-btn color="pink-lighten-2" :disabled="!userName" size="x-large" @click="registerName">got it!</v-btn>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
    }
  },
  methods: {
    registerName() {
      Cookies.set('userInfo', JSON.stringify({userName: this.userName, timestamp: new Date().getTime().toString()}));
      this.$router.push('/top');
    }
  }

}
</script>



<style scoped>

</style>
