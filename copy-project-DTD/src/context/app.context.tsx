import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccesToken, getProfile } from 'src/uitils/auth'

// khai báp type
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  // giá trị khởi tạo
  isAuthenticated: Boolean(getAccesToken()),
  setIsAuthenticate: () => null,
  profile: getProfile(),
  setProfile: () => null
}

// set up context
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticate] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticate, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}
