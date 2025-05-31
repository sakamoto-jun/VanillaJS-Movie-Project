import { Store } from '../core/common';

// interface State {
//   [key: string]: string;
//   photo: string;
//   name: string;
//   email: string;
//   blog: string;
//   github: string;
//   repository: string;
// }
type State = Record<'photo' | 'name' | 'email' | 'blog' | 'github' | 'repository', string>;

export default new Store<State>({
  photo: 'https://avatars.githubusercontent.com/u/200620328?v=4',
  name: 'sakamoto jun / Lee Jungi',
  email:'sakamotojun.dev@gmail.com',
  blog: '',
  github: 'https://github.com/sakamoto-jun',
  repository: 'https://github.com/sakamoto-jun/VanillaJS-Movie-Project'
});