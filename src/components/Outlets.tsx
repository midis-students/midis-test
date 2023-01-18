import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser, useIsAdmin } from '@/store/slices/User';
import React from 'react';

export function AuthOutlet() {
  const dispatch = useAppDispatch();
  const isAuth = !!useAppSelector((select) => select.auth.token);
  React.useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
    }
  }, [isAuth]);
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
}

export function PrivateOutlet() {
  return useIsAdmin() ? <Outlet /> : <Navigate to={'/'} />;
}
