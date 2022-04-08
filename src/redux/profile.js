import { api } from '../API/api'
import ActionsRedux from '../customsHooksAndFunctions/addReduser'

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
  userId: null,
  photos: {
    small: '',
    large: ''
  },
  status: ''
}
const [addReducer, setActionCreater, setDispatch] = ActionsRedux()

export const profile = (state = profileState, action) => addReducer(state, action)

export const profileThunk = (id) => async (dispatch) => {
  setDispatch(dispatch)
  let result = [true, true]
  let response = await api.profile.getProfil(id)
  if (response.status === 200) {
    setActionCreater('getProfile', response.data)
    result[0] = false
  }
  response = await api.profile.getStatus(id)
  if (response.status === 200) {
    setActionCreater('getStatus', { status: response.data })
    result[1] = false
  }
  result = !(!result[0] && !result[1])
  return result
}
export const setStatusThunk = status => dispatch => {
  setDispatch(dispatch)
  setActionCreater('getStatus', { status })
}
export const setProfileThunk = data => async (dispatch) => {
  setDispatch(dispatch)
  const response = await api.profile.profile(data)
  if (response.status === 200 && response.data.resultCode === 0) setActionCreater('setProfile', { ...data })
}
