import { Component } from '../core/common';
import movieStore, { searchMovies } from '../store/movie';

export default class Search extends Component {
  render() {
    this.el.classList.add('search');
    this.el.innerHTML = /* html */`
      <input 
        value="${movieStore.state.searchText}"
        placeholder="영화 제목을 입력해주세요."/>
      <button class="btn btn-primary">검색</button>
    `;

    const inputEl = this.el.querySelector('input');
    let isSearching = false;
    inputEl.addEventListener('input', (e) => {
      movieStore.state.searchText = e.target.value;
    });
    inputEl.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'
        && movieStore.state.searchText.trim()
        && !isSearching) {
        isSearching = true;
        searchMovies(1).finally(() => {
          isSearching = false;
        });
      }
    });

    const btnEl = this.el.querySelector('button');
    btnEl.addEventListener('click', () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1);
      }
    });
  }
}