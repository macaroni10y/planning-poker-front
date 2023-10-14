<template>
  <div class="plapo-main">
    <v-container class="participants-container ma-0 pa16">
      <v-row class="participants-header">
        <v-col class="header-content" cols="6">name</v-col>
        <v-col class="header-content" cols="6">vote</v-col>
      </v-row>
      <div style="max-height: 60vh;overflow-y: auto;">
      <v-row class="participant-container" v-for="participant in participants">
        <v-col class="participant-name">
        {{ participant.name }}
        </v-col>
        <v-col class="participant-vote">
          <div v-if="participant.vote">
            <v-icon color="green">mdi-check</v-icon>
          </div>
          <div v-else>
            <v-progress-circular indeterminate width="3" size="25"></v-progress-circular>
          </div>
        </v-col>
      </v-row>
      </div>
    </v-container>
    you selected
    <div class="own-vote-container">
      <div v-if="selectedCardNumber">
        {{ selectedCardNumber }}
      </div>
    </div>

    <div class="card-container">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :style="getStyle(index)"
        class="d-flex"
      >
        <v-card
          :elevation="hoveredCardIndex === index ? 12 : 2"
          class="card-wrapper"
          hover
          @mouseover="hoveredCardIndex = index"
          @mouseleave="hoveredCardIndex = null"
          @click="selectCard(card)"
        >
          <div style="flex:3">{{ card.name }}</div>
          <div style="flex:5; font-size: 36px; align-self: center;">{{ card.name }}</div>
          <div style="flex:1; align-self: end">{{ card.name }}</div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlapoPage',
  components: {},
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cards: [
        {name: '1/2'},
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '5'},
        {name: '8'},
        {name: '13'},
        {name: '20'},
        {name: '40'},
        {name: '100'},
        {name: 'skip'},
      ],
      participants: [
        {name: 'hoge', vote: '4'},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: '3'},
        {name: 'fuga', vote: '2'},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'fuga', vote: ''},
        {name: 'piyo', vote: ''},
      ],
      hoveredCardIndex: null,
      selectedCardNumber: null,
    };
  },
  methods: {
    selectCard(card) {
      this.selectedCardNumber = card.name;
    },
    getStyle(index) {
      return {
        width: '70px',
        minWidth: '70px',
        position: 'relative',
        bottom: '20px',
        left: `calc(-40px * ${index} + 180px)`
      };
    }
  }
}
</script>

<style scoped lang="scss">
.plapo-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .participants-container {
    flex: 5;

    .participants-header {

      margin: 0;
      background-color: rgb(255, 200, 220);

      .header-content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
    }

    .participant-container {
      margin: 0;
      .participant-name {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .participant-vote {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .own-vote-container {
    flex:1;
    font-size: 36px;
  }

  .card-container {
    width: 50vw;
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .card-wrapper {
      width: 70px;
      height: 120px;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-20px);
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}





</style>
