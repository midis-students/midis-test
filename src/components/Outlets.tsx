import { useIsAuth } from '@/store/authorization';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthOutlet() {
  const isAuth = useIsAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export function PrivateOutlet() {}
