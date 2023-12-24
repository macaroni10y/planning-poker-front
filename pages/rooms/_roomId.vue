<template>
  <div class="plapo-main">
    <v-container class="results-container">
      <v-row>
        <v-col v-for="result in voteResults" class="result-container">
          <v-row class="result-name">{{ result.name }}</v-row>
          <v-row class="result-content" v-if="voteCompleted">{{ result.value }}</v-row>
          <v-row class="result-content" v-else>
            <v-progress-circular indeterminate width="3" size="25"></v-progress-circular>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="participants-container pa-0">
      <v-row class="participants-header">
        <v-col class="header-content" cols="6">name</v-col>
        <v-col class="header-content" cols="6">vote</v-col>
      </v-row>
      <div style="max-height: 40vh;overflow-y: auto;">
        <v-row class="participant-container" v-for="participant in participants">
          <v-col class="participant-name">
            {{ participant.name }}
          </v-col>
          <v-col class="participant-vote">
            <div v-if="voteCompleted">{{ participant.vote }}</div>
            <div v-else-if="participant.vote">
              <v-icon color="green">mdi-check</v-icon>
            </div>
            <div v-else>
              <v-progress-circular indeterminate width="3" size="25"></v-progress-circular>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container class="button-wrapper">
      <v-btn color="#FFC8DCFF" width="40vw" max-width="200px" height="48px" elevation="none" @click="revealAllCards" class="ma-4">reveal</v-btn>
      <v-btn color="#FFC8DCFF" width="40vw" max-width="200px" height="48px" elevation="none" @click="resetRoom" class="ma-4">next vote</v-btn>
    </v-container>

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
          :class="selectedCardNumber === card.name ? 'card-wrapper-selected': ''"
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
import Cookies from 'js-cookie';

const CARD_OPTIONS = [
  '0.5',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
  'skip',
];
export default {
  name: 'PlapoPage',
  components: {},
  props: {
    roomId: {
      type: String,
      required: false,
      default: 'empty',
    },
  },
  data() {
    return {
      participants: [],
      userName: '',
      hoveredCardIndex: null,
      selectedCardNumber: null,
      socket: null,
    };
  },
  methods: {
    selectCard(card) {
      this.selectedCardNumber = card.name;
      this.submitCard();
    },
    getStyle(index) {
      return {
        width: '70px',
        minWidth: '70px',
        position: 'relative',
        bottom: '20px',
        left: `calc(-40px * ${index} + 200px)`
      };
    },
    joinRoom() {
      this.socket.send(JSON.stringify({
        action: 'joinRoom',
        roomId: this.roomId,
        userName: this.userName,
      }));
    },
    submitCard() {
      this.socket.send(JSON.stringify({
        action: 'submitCard',
        roomId: this.roomId,
        cardNumber: this.selectedCardNumber
      }));
    },
    resetRoom() {
      this.socket.send(JSON.stringify({
        action: 'resetRoom',
        roomId: this.roomId,
      }))
    },
    revealAllCards() {
      this.socket.send(JSON.stringify({
        action: 'revealAllCards',
        roomId: this.roomId,
      }))
    }
  },
  computed: {
    cards() {
      return CARD_OPTIONS.map(value => ({name: value}));
    },
    voteCompleted() {
      if (this.participants.length === 0) return false;
      return this.participants.every(value => value.vote);
    },
    availableVotes() {
      return this.participants
        .map(value => value.vote)
        .filter(value => !value || value !== 'skip');
    },
    sum() {
      return this.availableVotes
        .reduce((accumulator, current) => accumulator + +(current), 0)
    },
    average() {
      return +(Math.round(this.sum / this.availableVotes.length + "e+1") + "e-1") || '-';
    },
    groupedByCount() {
      return this.availableVotes.reduce((accumulator, current) => {
        accumulator[current] = (accumulator[current] || 0) + 1;
        return accumulator;
      }, {});
    },
    mode() {
      const counts = this.groupedByCount;
      const maxCount = Math.max(...Object.values(counts));
      return Object.keys(counts).filter(key => counts[key] === maxCount).join(', ') || '-';
    },
    scrumDecision() {
      const groups = Object.keys(this.groupedByCount)
        .sort((a, b) => +a - +b);
      const groupCount = groups.length;
      const isConsecutive = (startIndex, count) => [...Array(count).keys()]
        .every(offset => CARD_OPTIONS[startIndex + offset] === groups[offset]);
      if (groupCount === 1) {
        return groups[0];
      }
      const minIndex = CARD_OPTIONS.findIndex(value => value === groups[0]);
      if ((groupCount === 2 || groupCount === 3) && isConsecutive(minIndex, groupCount)) {
        return groups[1];
      }
      return 'discuss';
    },
    voteResults() {
      return [
        {name: 'average', value: this.average},
        {name: 'mode', value: this.mode},
        {name: 'scrum decision', value: this.scrumDecision}
      ];
    },

  },
  created() {
    const key = 'userInfo';
    const userInfo = JSON.parse(Cookies.get(key));
    console.log(userInfo);
    if (!userInfo) this.$router.push('/login');

    this.userName = userInfo.userName;

    this.socket = new WebSocket('wss://sjy1ekd1t6.execute-api.ap-northeast-1.amazonaws.com/v1/');
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.shouldReset) {
        this.selectedCardNumber = null;
      }
      this.participants = data.users.map(value => ({name: value.name, vote: value.cardNumber}));
    };
    this.socket.onopen = () => this.joinRoom();
  },
  beforeDestroy() {
    this.socket.close();
  }
}
</script>

<style scoped lang="scss">
.plapo-main {
  background-color: #fff5f8;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .results-container {
    border-radius: 10px;
  }

  .result-container {
    border-radius: 10px;
  }

  .result-name {
    font-size: 16px;
    justify-content: center;
  }

  .result-content {
    height: 36px;
    font-size: 24px;
    font-weight: bold;
    justify-content: center;
  }

  .participants-container {
    margin: 0;
    flex: 3;
    background-color: white;
    border-radius: 10px 10px 0 0;

    .participants-header {
      margin: 0;

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
        padding: 10px;
      }

      .participant-vote {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }
    }
  }

  .button-wrapper {
    background-color: white;
    flex: 0.5;
    display: flex;
    justify-content: center;
    border-radius: 0 0 10px 10px;
  }

  .card-container {
    width: 50vw;
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    .card-wrapper {
      width: 70px;
      height: 120px;
      display: flex;
      flex-direction: column;

      &-selected {
        background-color: #ff7fac;
      }

      &:hover {
        transform: translateY(-20px);
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}
</style>
