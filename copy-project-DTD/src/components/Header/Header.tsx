import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logout } from 'src/apis/auth.api'
import { AppContext } from 'src/context/app.context'
import { clearAccesTokenFromLocalStorage } from 'src/uitils/auth'

function Header() {
  const { setIsAuthenticate, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticate(false)
      setProfile(null)
    }
  })
  const handleLogout = () => {
    clearAccesTokenFromLocalStorage()
    logoutMutation.mutate()
  }
  return (
    <div>
      {isAuthenticated && (
        <div>
          <div onClick={handleLogout}>Đăng xuất</div>
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <Link to='/register'>đăng ký</Link>
          <Link to='/login'>đăng nhập</Link>
        </div>
      )}
    </div>
  )
}

export default Header
