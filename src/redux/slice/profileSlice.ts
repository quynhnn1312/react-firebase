import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeProfiles, getProfile } from 'redux/actions/profileActions'
import { IAuth, IProfile } from 'types'

export const profileUpdate = createAsyncThunk(
  'profile/update',
  async ({ user, data }: { user: IAuth; data: IProfile }) => {
    return await changeProfiles(user, data)
  }
)

export const fetchProfile = createAsyncThunk(
  'profile/update',
  async (uid: string) => {
    return await getProfile(uid)
  }
)

export interface ProfileState {
  profile?: IProfile
}

const initialState: ProfileState = {
  profile: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith('profile') && type.endsWith('/fulfilled'),
      (state, action: PayloadAction<IProfile | undefined>) => {
        state.profile = action.payload
      }
    )
  },
})

export default profileSlice.reducer
