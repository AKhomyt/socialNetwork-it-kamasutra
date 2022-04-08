import { api } from '../API/api'
import ActionsRedux from '../customsHooksAndFunctions/addReduser'

const initializationState = {
  id: 0,
  login: '',
  email: ''
}

const [addReducer, setActionCreater, setDispatch] = ActionsRedux()
export const auth = (state = initializationState, action) => addReducer(state, action)

// Actions creators and Thunks
export const authThunk = () => async dispatch => {
  setDispatch(dispatch)
  const response = await api.auth.me()
  if (response.status === 200 && response.data.resultCode === 0) setActionCreater('authMe', response.data.data)
}
export const loginThunk = (data) => async dispatch => {
  setDispatch(dispatch)
  const response = await api.auth.loginPOST(data)
  if (response.status === 200 && response.data.resultCode === 0) setActionCreater('login', { id: response.data.data.userId })
}
export const logoutThunk = () => async dispatch => {
  setDispatch(dispatch)
  const response = await api.auth.loginDELETE()
  if (response.status === 200 &&
    response.data.resultCode === 0) setActionCreater('logout', { id: 0 })
}
