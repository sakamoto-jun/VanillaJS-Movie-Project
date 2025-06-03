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

    const inputEl = this.el.querySelector('input') as HTMLInputElement;
    inputEl.addEventListener('input', () => {
      movieStore.state.searchText = inputEl.value;
    });
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter'
        && movieStore.state.searchText.trim()
        && !movieStore.state.loading) {
        searchMovies(1);
      }
    });

    const btnEl = this.el.querySelector('button') as HTMLButtonElement;
    btnEl.addEventListener('click', () => {
      if (movieStore.state.searchText.trim()
        && !movieStore.state.loading) {
        searchMovies(1);
      }
    });
  }
}