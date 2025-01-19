import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../layouts/app.layout'
import PatientPage from '../pages/Patient'

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/patients" element={<PatientPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}