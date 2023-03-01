import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './context/app.context'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Productlist from './pages/Productlist'
import Register from './pages/Register'

function ProtectedRoute () {
  const {isAuthenticated} = useContext(AppContext)
  return isAuthenticated? <Outlet/> : <Navigate to="/login"/>
}


function RejectedRoute () {
  const {isAuthenticated} = useContext(AppContext)
  return !isAuthenticated ? <Outlet/> : <Navigate to="/"/>
}

export default function useRouterElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <Productlist />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])

  return routeElement
}
