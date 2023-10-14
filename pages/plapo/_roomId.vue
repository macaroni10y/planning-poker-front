<template>

  <v-row class="pa-1">
    <v-col
      v-for="(card, index) in cards"
      :key="index"
      cols="4"
      style="width: 120px; min-width: 120px;"
      class="d-flex justify-center pa-2"
    >
      <v-card
        :elevation="selectedCardIndex === index ? 12 : 2"
        style="width: 90px; height: 150px;"
        class="d-flex justify-center align-center hover-when-mouseover"
        hover
        @mouseover="selectedCardIndex = index"
        @mouseleave="selectedCardIndex = null"
        @click="selectCard(index)"
      >
        <v-card-text class="text-center">
          {{ card.name }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '5'},
        {name: '8'},
        {name: '13'},
        {name: '21'},
        {name: '34'},
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
.hover-when-mouseover:hover {
  transform: translateY(-10px);
  transition: transform 0.3s ease-in-out;
}
</style>
