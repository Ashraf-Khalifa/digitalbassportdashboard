import { useNavigate } from 'react-router-dom';

export function useProtectedRoute(allowedRoles, userRole) {
  const navigate = useNavigate();

  if (!allowedRoles.includes(userRole)) {
    navigate('/access-denied');
  }
}
