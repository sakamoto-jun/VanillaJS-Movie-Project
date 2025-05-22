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
    inputEl.addEventListener('input', (e) => {
      movieStore.state.searchText = e.target.value;
    });
    inputEl.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' && movieStore.state.searchText.trim()) {
        searchMovies(1);
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