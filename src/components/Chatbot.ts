import { Component } from '../core/common';
import chatStore, { sendMessages, resetMessages } from '../store/chatbot';
import movieStore, { searchMovies } from '../store/movie';

export default class Chatbot extends Component {
  constructor() {
    super();
    chatStore.subscribe('messages', () => this.render());
    chatStore.subscribe('loading', () => this.render());
  }
  render(): void {
    this.el.classList.add('chatbot');
    this.el.innerHTML = /* html */`
      <div class="chats">
        <ul>
          ${chatStore.state.messages.map(message => /* html */`
            <li class="${message.role}">
              ${message.role === 'assistant' ? (/* html */`
                <div class="profile">
                  <span class="material-symbols-outlined">smart_toy</span>
                </div>
              `) : ''}
              ${typeof message.content === 'string'
                ? message.content.replace(/{{(.*?)\/\/(.*?)}}/g, (match, ko, en) => /* html */`
                  <span class="movie-title" data-movie-title="${en}">${ko}</span>
                `)
                : ''}
            </li>
          `).join('')}
          ${chatStore.state.loading ? (/* html */`
            <li class="assistant">
              <div class="profile">
                <span class="material-symbols-outlined">smart_toy</span>
              </div>
              <div class="the-loader"></div>
            </li>
          `) : ''}
        </ul>
        <div class="input">
          <input type="text"/>
          <button class="btn btn-primary">
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
      <div class="btn btn-circle chat-starter">
        <span class="material-symbols-outlined icon--open">chat</span>
        <span class="material-symbols-outlined icon--close">close</span>
      </div>
    `;

    const inputEl = this.el.querySelector('input') as HTMLInputElement;
    inputEl.addEventListener('input', () => {
      chatStore.state.chatText = inputEl.value;
    });
    inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter'
        && !e.isComposing
        && !chatStore.state.loading
      ) {
        sendMessages();
      }
    });

    const btnEl = this.el.querySelector('.input button') as HTMLButtonElement;
    btnEl.addEventListener('click', () => {
      if (!chatStore.state.loading) {
        sendMessages();
      }
    });

    const chatStarterEl = this.el.querySelector('.chat-starter') as HTMLDivElement;
    chatStarterEl.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      this.el.classList.toggle('chatbot--on');

      const offChats = () => this.el.classList.remove('chatbot--on');
      if (this.el.classList.contains('chatbot--on')) {
        window.addEventListener('click', offChats);
        setTimeout(() => {
          inputEl.focus();
        }, 300);
      } else {
        window.removeEventListener('click', offChats);
      }
    });

    const chatsEl = this.el.querySelector('.chats') as HTMLDivElement;
    chatsEl.addEventListener('click', (e: Event) => {
      e.stopPropagation();
    });

    const messageListEl = this.el.querySelector('.chats ul') as HTMLUListElement;
    messageListEl.scrollTo(0, messageListEl.scrollHeight || 0);

    inputEl.focus();

    const movieTitleEls = document.querySelectorAll<HTMLSpanElement>('.movie-title');
    movieTitleEls.forEach(movieTitleEl => {
      movieTitleEl.addEventListener('click', () => {
        const searchInputEl = document.querySelector<HTMLInputElement>('.search input');
        const title = movieTitleEl.dataset.movieTitle || '';

        if (!searchInputEl) { return; }
        searchInputEl.value = title;
        movieStore.state.searchText = title;
        searchMovies(1);
      });
    });
  }
}