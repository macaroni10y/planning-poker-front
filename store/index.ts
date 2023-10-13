import { MutationTree, ActionTree } from 'vuex';

export interface RootState {
  selectedCard: string | null;
}

export const state = (): RootState => ({
  selectedCard: null
});

export const mutations: MutationTree<RootState> = {
  setSelectedCard(state, card: string) {
    state.selectedCard = card;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  selectCard({ commit }, card: string) {
    commit('setSelectedCard', card);
    (this as any).$socket.send(JSON.stringify({
      action: 'selectCard',
      card: card
    }));
  }
};
