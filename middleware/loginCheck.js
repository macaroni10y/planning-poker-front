import Cookies from 'js-cookie';

export default ({redirect, route}) => {
  const userInfo = Cookies.get('userInfo');

  if(route.params.roomId && !userInfo) return redirect(`/?redirectRoomId=${route.params.roomId}`, {redirectRoomId: route.params.roomId});
  if(route.path === '/' && userInfo) return redirect('/top');
  if (route.path !== '/' && !userInfo) return redirect('/');
}
