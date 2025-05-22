import App from './App';
import router from './routes';

// root에 App 추가
const root = document.querySelector('#root');
root.append(new App().el);

// 라우터 실행
router();