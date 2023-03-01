import * as yup from 'yup'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form/dist/types'
import { type } from 'os'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    }, // bắt buộc phải nhập dữu liệu
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không hợp lệ'
    }, // check xem có phải email ko
    maxLength: {
      value: 160,
      message: 'Tối đa 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Tối thiểu 5 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    }, // bắt buộc phải nhập dữu liệu
    maxLength: {
      value: 160,
      message: 'Tối đa 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Tối thiểu 5 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng nhập lại password là bắt buộc'
    }, // bắt buộc phải nhập dữu liệu
    maxLength: {
      value: 160,
      message: 'Tối đa 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Tối thiểu 5 kí tự'
    },
    // so sánh value
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại pass không khớp '
        : undefined
  }
})

// yup

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ')
    .min(5, 'Tối thiểu 5 kí tự')
    .max(160, 'Tối đa 160 kí tự'),
  password: yup.string().required('Password là bắt buộc').min(5, 'Tối thiểu 5 kí tự').max(160, 'Tối đa 160 kí tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại password là bắt buộc')
    .min(5, 'Tối thiểu 5 kí tự')
    .max(160, 'Tối đa 160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

export type Schema = yup.InferType<typeof schema> // kế thừa schema -> ko cần khái báo interface
