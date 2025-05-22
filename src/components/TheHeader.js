import { Component } from '../core/common';

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/'
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt1431045'
          },
          {
            name: 'About',
            href: '#/about'
          }
        ]
      }
    });
    
    window.addEventListener('popstate', () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /* html */`
      <a class="logo" href="#/">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>${this.state.menus.map(menu => {
          const href = menu.href.split('?')[0];
          const hash = location.hash.split('?')[0];
          const isActive = href === hash;

          return /* html */`
          <li>
            <a
              class="${isActive ? 'active' : ''}"
              href="${menu.href}">
              ${menu.name}
            </a>
          </li>`
        }).join('')}</ul>
      </nav>
      <a class="user" href="#/about">
        <img src="https://avatars.githubusercontent.com/u/200620328?v=4" alt="User"/>
      </a>
    `;
  }
}