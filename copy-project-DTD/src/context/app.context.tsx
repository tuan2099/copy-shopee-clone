import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccesToken, getProfile } from 'src/uitils/auth'

interface AppContextInterface {
  isAuthenticated:boolean
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppconText: AppContextInterface = {
  isAuthenticated: Boolean(getAccesToken()),
  setIsAuthenticate: () => null,
  profile: getProfile(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppconText)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticate] = useState<boolean>(initialAppconText.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppconText.profile)

  return <AppContext.Provider value={{ profile, setProfile, setIsAuthenticate, isAuthenticated }}>{children}</AppContext.Provider>
}
