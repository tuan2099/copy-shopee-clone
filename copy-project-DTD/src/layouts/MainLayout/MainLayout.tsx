import React from 'react'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default MainLayout
