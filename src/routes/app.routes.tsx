import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import 'dayjs/locale/es'
import AppLayout from '../layouts/app.layout'
import PatientsPage from '../pages/Patients'
import PatientPage from '../pages/Patient'

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patient/:id" element={<PatientPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}