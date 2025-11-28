import { Outlet } from 'react-router-dom'

import Navbar from './navbar'

function Layout() {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

// 768px -> des, mobile

export default Layout