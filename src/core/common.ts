///// Component /////
interface ComponentPayload {
  tagName?: string;
  props?: {
    [key: string]: unknown
  };
  state?: {
    [key: string]: unknown
  };
}

export class Component {
  public el;
  public props;
  public state;

  constructor(payload: ComponentPayload = {}) {
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

///// Router /////
interface Route {
  path: string;
  component: typeof Component;
}
type Routes = Route[];

function routeRender(routes: Routes) {
  if (!location.hash) {
    history.replaceState({}, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  interface Query {
    [key: string]: string;
  }
  const query = queryString // a=123&b=456
    .split('&') // [a=123, b=456]
    .reduce((acc, cur) => {
      const [key, value] = cur.split('='); // [a, 123] [b, 456]
      acc[key] = value;
      return acc;
    }, {} as Query);
  history.replaceState(query, '');

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash));
  if (routerView) {
    routerView.innerHTML = '';
    currentRoute && routerView.append(new currentRoute.component().el);
  }
}

export function createRouter(routes: Routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  }
}

///// Store /////
// interface StoreObservers {
//   [key: string]: SubscribeCallback[];
// }
// type SubscribeCallback = (arg: unknown) => void;
type SubscribeCallback<T> = (arg: T) => void;

export class Store<S extends object> {
  public state = {} as S;
  // private observers = {} as StoreObservers;
  private observers: {
    [K in keyof S]?: SubscribeCallback<S[K]>[]
  } = {};

  constructor(state: S) {
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (newValue) => {
          state[key] = newValue;
          // if (Array.isArray(this.observers[key])) {
          //   this.observers[key].forEach(observer => observer(newValue));
          // }
          this.observers[key as keyof S]?.forEach(cb => cb(newValue));
        }
      });
    }
  }
  // subscribe(key: string, callback: SubscribeCallback) {
  subscribe<K extends keyof S>(key: K, callback: SubscribeCallback<S[K]>) {
    // Array.isArray(this.observers[key])
    //   ? this.observers[key].push(callback)
    //   : this.observers[key] = [callback];
    (this.observers[key] ||= []).push(callback);
  }
}