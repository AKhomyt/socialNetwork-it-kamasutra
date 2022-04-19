import { api } from '../API/api'

const profileState = {
  aboutMe: '',
  contacts: {
    facebook: '',
    website: '',
    vk: '',
    twitter: '',
    instagram: '',
    youtube: '',
    github: '',
    mainLink: ''
  },
  lookingForAJob: true,
  lookingForAJobDescription: '',
  fullName: '',
  userId: 0,
  photos: {
    small: '',
    large: ''
  },
  status: ''
}
export type profileType = typeof profileState
const types = {
  getProfile: 'getProfile',
  getStatus: 'getStatus',
  setProfile: 'setProfile'
}
export const profile = (state = profileState, action: { type: string, [key: string]: any }) => {
  switch (action.type) {
    case types.getProfile: {
      return { ...state, ...action.data }
    }
    case types.getStatus: {
      return { ...state, status: action.status }
    }
    case types.setProfile: {
      return { ...state, ...action.data }
    }
    default:
      return state
  }
}
const getStatusAction = (status: string) => ({ type: types.getStatus, status })

export const profileThunk = (id: number) => async (dispatch: any) => {
  let result: Array<boolean> | boolean = [true, true]
  let response = await api.profile.getProfil(id)
  if (response.status === 200) {
    dispatch({ type: types.setProfile, data: response.data })
    result[0] = false
  }
  response = await api.profile.getStatus(id)
  if (response.status === 200) {
    dispatch(getStatusAction(response.data))
    result[1] = false
  }
  result = !(!result[0] && !result[1])
  return result
}
export const setStatusThunk = (status: any) => (dispatch: any) => {
  dispatch(getStatusAction(status))
}
export const setProfileThunk = (data: any) => async (dispatch: any) => {
  const response = await api.profile.profile(data)
  if (response.status === 200 && response.data.resultCode === 0) dispatch({ type: 'setProfile', data })
}
