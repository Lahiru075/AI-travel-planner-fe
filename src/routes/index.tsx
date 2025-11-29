import React, { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import Layout from '../components/Layout'

const Signup = lazy(() => import('../page/signup'))
const Login = lazy(() => import('../page/login'))
const Userdashboard = lazy(() => import('../page/userdashboard'))
const Admindashboard = lazy(() => import('../page/admindashboard'))
const Createtrip = lazy(() => import('../page/createtrip'))
const TripHistory = lazy(() => import('../page/triphistory'))
const ViewTrip = lazy(() => import('../page/viewtrip'))
const HomePage = lazy(() => import('../page/homepage'))
const AdminLayout = lazy(() => import('../components/AdminLayout'))

type RequireAuthType = { children: ReactNode, role?: string[] }

const RequireAuth = ({ children, role }: RequireAuthType) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }


  if (role && !role.some((role) => user.role?.includes(role))) {

    return (
      // 👇 මෙතන වෙනස් කළා: fixed inset-0 z-50 දැම්මා
      <div className="fixed inset-0 z-50 min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">

        {/* Icon (Optional - ලස්සනට පේන්න) */}
        <div className="bg-red-500/10 p-4 rounded-full mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>

        <h2 className="text-3xl font-bold mb-2">Access Denied</h2>
        <p className="text-slate-400">You do not have permission to view this page.</p>

      </div>
    )
  }

  return <>{children}</>
}

function index() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
            <Route
              path="/admindashboard"
              element={
                <RequireAuth role={["ADMIN"]}>
                  <Admindashboard />
                </RequireAuth>
              }
            />
          </Route>

          <Route element={<RequireAuth><Layout /></RequireAuth>}>

            <Route
              path="/userdashboard"
              element={
                <RequireAuth role={["USER"]}>
                  <Userdashboard />
                </RequireAuth>
              }
            />

            <Route path='/createtrip'
              element={
                <RequireAuth role={["USER"]}>
                  <Createtrip />
                </RequireAuth>
              }
            />

            <Route
              path='/viewtrip/:id'
              element={
                <RequireAuth role={["USER"]}>
                  <ViewTrip />
                </RequireAuth>
              }
            />

            <Route
              path='/triphistory'
              element={
                <RequireAuth role={["USER"]}>
                  <TripHistory />
                </RequireAuth>
              }
            />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default index