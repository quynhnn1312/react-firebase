import { IRegister } from 'types'

export const validRegister = ({
  name,
  email,
  password,
  cf_password,
}: IRegister) => {
  const errors: string[] = []
  if (!name.trim()) {
    errors.push('Please add your name.')
  } else if (name.length > 20) {
    errors.push('Your name is up to 20 chars long.')
  }

  if (!email.trim()) {
    errors.push('Please add your email.')
  } else if (!validateEmail(email)) {
    errors.push('Email format is incorrect.')
  }

  const msg = checkPassword(password, cf_password)

  if (msg) errors.push(msg)

  return {
    errMsg: errors,
    errLength: errors.length,
  }
}

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return 'Password must be at  least 6 characters'
  } else if (password !== cf_password) {
    return 'Confirm password'
  }
}
