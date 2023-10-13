<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="2"
      >
        <v-card
          :elevation="selectedCardIndex === index ? 12 : 2"
          class="mx-auto"
          hover
          @mouseover="selectedCardIndex = index"
          @click="selectCard(index)"
        >
          <v-card-text class="text-center">
            {{ card.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
        {name: 'Card 1'},
        {name: 'Card 2'},
        {name: 'Card 3'},
        // ... その他のカード
      ],
      selectedCardIndex: null,
    };
  },
  methods: {
    selectCard(index) {
      // カードを選択した際の処理をここに記述
      alert(`You selected: ${this.cards[index].name}`);
    }
  }
}
</script>

<style scoped>
.hand {
  display: flex;
  gap: 10px;
}

.card {
  padding: 20px;
  border: 1px solid black;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card.selected {
  transform: scale(1.2);
  z-index: 1;  /* カードが他のカードの上に表示されるようにする */
}
</style>
