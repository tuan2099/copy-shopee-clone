import React from 'react'
import { ButtonHTMLAttributes } from 'react'

interface buttonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
function Button(props: buttonType) {
  const { children, className, ...rest } = props
  return (
    <>
      <button {...rest}>{children}</button>
    </>
  )
}

export default Button
