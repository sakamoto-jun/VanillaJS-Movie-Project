import { Component } from '../core/common';
import { SimpleMovie } from '../store/movie';

interface Props {
  [key: string]: unknown;
  movie: SimpleMovie;
}

export default class MovieItem extends Component {
  public props!: Props; // 할당 단언 "이게 맞아!"

  constructor(props: Props) {
    super({
      tagName: 'a',
      props
    });
  }
  render() {
    const { movie } = this.props;

    this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`);
    this.el.classList.add('movie');
    this.el.style.backgroundImage = `url(${movie.Poster})`;
    this.el.innerHTML = /* html */`
      <div class="info">
        <div class="year">${movie.Year}</div>
        <div class="title">${movie.Title}</div>
      </div>
    `;
  }
}