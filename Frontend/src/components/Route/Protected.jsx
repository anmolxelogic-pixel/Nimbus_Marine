import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Protected({ children, allowedRole }) {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to='/login' replace />
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/home'} replace />
  }

  return children
}

export default Protected;
