import { Link, useHistory } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import BigLoading from 'components/global/loading'
import LoginForm from 'components/auth/LoginForm'
import LoginSocial from 'components/auth/LoginSocial'
import { useEffect } from 'react'

const Login = () => {
  const { loading, currentUser } = useAppSelector((state) => state.auth)
  const history = useHistory()

  useEffect(() => {
    if (currentUser) return history.replace('/')
  }, [history, currentUser])

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-6rem)]'>
      <div className='container max-w-md p-5 shadow'>
        <h2 className='my-3 text-2xl font-semibold tracking-widest text-center uppercase'>
          Dev AT
        </h2>
        <LoginForm />
        <div className='text-center'>Or</div>
        <LoginSocial />
        <div>
          Are you have an account?
          <Link to='/register' className='text-red-500 hover:underline ml-2'>
            Register
          </Link>
        </div>
      </div>

      {loading && <BigLoading />}
    </div>
  )
}

export default Login
