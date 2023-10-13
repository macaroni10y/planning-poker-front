import { Plugin } from '@nuxt/types';

const websocketPlugin: Plugin = ({ store }) => {
  const connection = new WebSocket('ws://your-websocket-server-url');

  connection.onmessage = (event: MessageEvent) => {
    const payload: WebSocketMessage = JSON.parse(event.data);
    if (payload.action === 'cardSelected' && payload.card) {
      store.commit('setSelectedCard', payload.card);
    }
  };

  (store as any).$socket = connection;
};

export default websocketPlugin;
