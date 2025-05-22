// Component
export class Component {
  constructor(payload = {}) {
    const {
      tagName = 'div',
      props = {},
      state = {}
    } = payload;

    this.el = document.createElement(tagName);
    this.props = props;
    this.state = state;

    this.render();
  }
  render() {
    //...
  }
}

// Router
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState({}, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  const query = queryString // a=123&b=456
    .split('&') // [a=123, b=456]
    .reduce((acc, cur) => {
      const [key, value] = cur.split('='); // [a, 123] [b, 456]
      acc[key] = value;
      return acc;
    }, {});
  history.replaceState(query, '');

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash));
  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  }
}

// Store
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};

    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (newValue) => {
          state[key] = newValue;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach(observer => observer(newValue));
          }
        }
      });
    }
  }
  subscribe(key, callback) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(callback)
      : this.observers[key] = [callback];
  }
}