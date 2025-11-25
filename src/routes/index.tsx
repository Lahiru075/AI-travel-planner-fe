import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Signup = lazy(() => import('../page/signup'))
const Login = lazy(() => import('../page/login'))

function index() {
  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Suspense>
    </BrowserRouter>
  )
}

export default index