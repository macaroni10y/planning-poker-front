// middleware/auth-check.js
import Cookies from 'js-cookie';

export default ({redirect, route}) => {
  const userInfo = Cookies.get('userInfo');
  if(route.path === '/' && userInfo) return redirect('/top');
  if (route.path !== '/' && !userInfo) return redirect('/');
}
