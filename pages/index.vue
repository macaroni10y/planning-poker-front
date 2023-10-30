<template>
  <div class="main-content">
    <input class="c-input" placeholder="input your name" type="text" v-model="userName" @keydown.enter="registerNameWithEnterKey">
    <v-btn color="#FFC8DCFF" :disabled="!userName"  @click="registerName">got it!</v-btn>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      redirectRoomId: '',
    }
  },
  methods: {
    registerName() {
      Cookies.set('userInfo', JSON.stringify({userName: this.userName, timestamp: new Date().getTime().toString()}));
      if (this.redirectRoomId) {
        this.$router.push(`/rooms/${this.redirectRoomId}`);
        return;
      }
      this.$router.push('/top');
    },
    registerNameWithEnterKey(event) {
      if(!this.userName) return;
      if(event.keyCode !== 13) return;
      this.registerName();
    }
  },
  mounted() {
    const { redirectRoomId } = this.$route.query;
    if (redirectRoomId) {
      this.redirectRoomId = redirectRoomId;
    }
  }

}
</script>

<style scoped lang="scss">
.main-content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .c-input {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #000;
    padding: 10px;
    font-size: 20px;
  }
}
</style>
