<template>
  <div class="c-top">
    <div class="c-join-room-container">
        <input class="c-input" placeholder="input room id" type="text" v-model="roomId">
        <v-btn color="pink-lighten-2" :disabled="!roomId" size="x-large" @click="joinRoom">join</v-btn>
    </div>
        <v-btn color="#FFC8DCFF" @click="createRoom">create room</v-btn>
  </div>
</template>

<script>
export default {
  name: 'TopPage',
  components: {},
  props: {},
  data() {
    return {
      roomId: '',
    }
  },
  methods: {
    joinRoom() {
      console.log(this.roomId)
      if (!this.roomId) return;
      this.$router.push(`/rooms/${this.roomId}`);
    },
    createRoom() {
      this.$router.push(`/rooms/${Math.random().toString(32).substring(6)}`);
    }
  },
}
</script>

<style>
.c-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  .c-join-room-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
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
