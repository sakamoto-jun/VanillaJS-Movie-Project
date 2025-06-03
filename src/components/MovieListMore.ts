import { Component } from '../core/common';
import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: 'button'
    });
    movieStore.subscribe('pageMax', () => this.updateVisibility());
    this.updateVisibility();
  }
  updateVisibility() {
    const { page, pageMax } = movieStore.state;

    if (pageMax > page) {
      this.el.classList.remove('hide');
    } else {
      this.el.classList.add('hide');
    }
  }
  render() {
    this.el.classList.add('btn', 'view-more');
    this.el.textContent = 'More...';

    this.el.addEventListener('click', async () => {
      this.el.classList.add('hide');
      await searchMovies(movieStore.state.page + 1);
    });
  }
}