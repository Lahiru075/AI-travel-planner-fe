import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

// 768px -> des, mobile

export default Layout