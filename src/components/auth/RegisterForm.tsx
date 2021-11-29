import Errors from 'components/global/Errors'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch } from 'redux/hooks'
import { authRegister } from 'redux/slice/authSlice'
import { validRegister } from 'utils/valid'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cf_password, setCfPassword] = useState('')

  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const user = { name, email, password, cf_password }
    const result = validRegister(user)

    if (result.errLength) {
      return toast.error(() => <Errors errors={result.errMsg} />)
    }

    dispatch(authRegister(user))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='my-3'>
        <label htmlFor='name'>Display Name</label>
        <input
          type='text'
          id='name'
          className='w-full p-3 border'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='my-3'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          className='w-full p-3 border'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className='my-3'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className='w-full p-3 border'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className='my-3'>
        <label htmlFor='cf_password'>Confirm Password</label>
        <input
          type='password'
          id='cf_password'
          className='w-full p-3 border'
          value={cf_password}
          onChange={(e) => setCfPassword(e.target.value)}
          required
        />
      </div>

      <button
        type='submit'
        className='w-full p-3 my-2 font-semibold tracking-widest uppercase border hover:bg-gray-200'
      >
        Register
      </button>
    </form>
  )
}

export default RegisterForm
