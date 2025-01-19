import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '../layouts/auth.layout'
import LoginPage from '../pages/Login'

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to='/login' /> } />
        </Route>
        <Route path="*" element={<Navigate to='/auth/login' /> } />
      </Routes>
    </BrowserRouter>
  )
}