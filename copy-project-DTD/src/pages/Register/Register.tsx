import React, { useContext } from 'react'
import Button from 'src/components/button'
import Input from 'src/components/input'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/uitils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { AppContext } from 'src/context/app.context'
import { isAxiosUnprocessableEntityError } from 'src/uitils/uitils'
import { ErrorResponse } from 'src/types/uitils.type'
import { useNavigate } from 'react-router-dom'

type FormData = Schema
function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const { setProfile, setIsAuthenticate } = useContext(AppContext)
  const RegisteraccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    RegisteraccountMutation.mutate(body, {
      onSuccess(data) {
        setIsAuthenticate(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <>
      <form noValidate onSubmit={onSubmit}>
        <Input
          name='email'
          placeholder='Email'
          type='email'
          className='mt-8'
          register={register}
          errorsMesage={errors.email?.message}
        />
        <Input
          name='password'
          placeholder='Password'
          type='password'
          className='mt-2'
          register={register}
          errorsMesage={errors.password?.message}
        />
        <Input
          name='confirm_password'
          placeholder='Confirm password'
          type='password'
          className='mt-2'
          register={register}
          errorsMesage={errors.confirm_password?.message}
        />
        <Button
          isLoading={RegisteraccountMutation.isLoading}
          disabled={RegisteraccountMutation.isLoading}
          type='submit'
        >
          {RegisteraccountMutation.isLoading ? 'Loading...' : 'Đăng kí'}
        </Button>
      </form>
    </>
  )
}

export default Register
