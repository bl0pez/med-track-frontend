import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../layouts/app.layout'

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<></>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}