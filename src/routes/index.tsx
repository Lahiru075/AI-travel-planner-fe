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
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Access denied</h2>
        <p className="text-gray-300">You do not have permission to view this page</p>
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

          <Route element={<RequireAuth><Layout /></RequireAuth>}>

            <Route path="/userdashboard" element={<Userdashboard />} />

            <Route path='/createtrip' element={<Createtrip />} />

            <Route path='/viewtrip/:id' element={<ViewTrip />} />

            <Route
              path="/admindashboard"
              element={
                <RequireAuth role={["ADMIN"]}>
                  <Admindashboard />
                </RequireAuth>
              }
            />

            <Route path='/triphistory' element={<TripHistory />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default index