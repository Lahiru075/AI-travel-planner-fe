import React from 'react'
import { useAuth } from '../context/authContext'

function userdashboard() {

    const { user } = useAuth();

  return (
    <div>
        <h1>User Dashboard</h1>
        <p>Username: {user.email}</p>
        <p>Email: {user.role}</p>
    </div>
  )
}

export default userdashboard