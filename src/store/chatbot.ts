import { Store } from '../core/common';
import OpenAI from 'openai';

interface State {
  chatText: string;
  messages: OpenAI.ChatCompletionMessageParam[];
  loading: boolean;
}

const defaultMessage: OpenAI.ChatCompletionMessageParam[] = [
  { role: 'assistant', content: '좋아하는 영화 장르나 제목을 알려주세요.' }
];

const store = new Store<State>({
  chatText: '',
  messages: defaultMessage,
  loading: false
});
export default store;

export const sendMessages = async (): Promise<void> => {
  if (!store.state.chatText.trim()) { return; }
  if (store.state.loading) { return; }

  store.state.loading = true;
  store.state.messages = [
    ...store.state.messages,
    { role: 'user', content: store.state.chatText }
  ];

  try {
    const res = await fetch('api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: store.state.messages
      })
    })
    const message = await res.json();
    
    store.state.messages = [
      ...store.state.messages,
      message
    ];
    store.state.chatText = '';
  } catch (error) {
    console.log('sendMessages Error: ', error);
  } finally {
    store.state.loading = false;
  }
};
export const resetMessages = (): void => {
  store.state.messages = defaultMessage;
};