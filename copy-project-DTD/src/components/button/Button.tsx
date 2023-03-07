import React from 'react'
import { ButtonHTMLAttributes } from 'react'

interface buttonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

function Button(props: buttonType) {
  const { children, className, isLoading, disabled, ...rest } = props
  const newClassName = disabled ? className + 'cursor-not-allowed' : className

  return (
    <>
      <button className={newClassName} disabled={disabled} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button
