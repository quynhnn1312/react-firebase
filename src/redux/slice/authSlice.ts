import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  facebookApi,
  forgotPasswordApi,
  googleApi,
  loginApi,
  registerApi,
  signOutApi,
} from 'redux/actions/authActions'
import { IAuth, ILogin, IRegister } from 'types'

export const authRegister = createAsyncThunk(
  'auth/register',
  async (user: IRegister) => {
    return await registerApi(user)
  }
)

export const authLogin = createAsyncThunk(
  'auth/login',
  async (user: ILogin) => {
    return await loginApi(user)
  }
)

export const authGoogleLogin = createAsyncThunk('auth/google', async () => {
  return await googleApi()
})

export const authFacebookLogin = createAsyncThunk('auth/facebook', async () => {
  return await facebookApi()
})

export const authForgotPassword = createAsyncThunk(
  'auth/forgot_password',
  async (email: string) => {
    return await forgotPasswordApi(email)
  }
)

export const authLogout = createAsyncThunk('auth/logout', async () => {
  return await signOutApi()
})

export interface AuthState {
  currentUser?: IAuth
  loading: boolean
}

const initialState: AuthState = {
  currentUser: undefined,
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.startsWith('auth') && type.endsWith('/pending'),
        (state) => {
          state.loading = true
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('auth') && type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
        }
      )
  },
})

export const { addUser } = authSlice.actions

export default authSlice.reducer
