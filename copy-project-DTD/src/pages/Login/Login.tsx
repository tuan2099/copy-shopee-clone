import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { login } from 'src/apis/auth.api'
import Button from 'src/components/button'
import Input from 'src/components/input'
import { AppContext } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/uitils.type'
import { User } from 'src/types/user.type'
import { Schema, schema } from 'src/uitils/rule'
import { isAxiosUnprocessableEntityError } from 'src/uitils/uitils'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

function Login() {
  const { setProfile } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data: { data: { data: { user: React.SetStateAction<User | null> } } }) => {
        setProfile(data.data.data.user)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
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
        <Button type='submit'>Đăng nhập</Button>
      </form>
    </>
  )
}

export default Login
