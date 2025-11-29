import { Outlet } from 'react-router-dom'


function AdminLayout() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

// 768px -> des, mobile

export default AdminLayout