import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import 'dayjs/locale/es'
import AppLayout from '../layouts/app.layout'
import PatientsPage from '../pages/Patients'
import PatientPage from '../pages/Patient'
import DashboardPage from '../pages/Dashboard'
import CylindersPage from '../pages/Cylinders'

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path='/' element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patients/:id" element={<PatientPage />} />
            <Route path='/cylinders' element={<CylindersPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}