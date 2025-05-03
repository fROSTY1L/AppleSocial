import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks';

export const AuthHandler = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAuthRedirect = useCallback(() => {
    if (!token && pathname !== '/auth') {
      navigate('/auth', { replace: true });
    } else if (token && (pathname === '/auth' || pathname === '/')) {
      navigate('/', { replace: true });
    }
  }, [token, pathname, navigate]);

  useEffect(() => {
    handleAuthRedirect();
  }, [handleAuthRedirect]);

  return null;
};