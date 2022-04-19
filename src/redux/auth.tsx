import { api } from '../API/api'

const authState = {
  id: 0,
  login: '',
  email: ''
}
const types = {
  authMe: 'authMe',
  login: 'login',
  logout: 'logout'
}
export type authType = typeof authState;

export const auth = (state = authState, action: { type: string, [key: string]: any }) => {
  switch (action.type) {
    case types.authMe: {
      return { ...state, ...action.data }
    }
    case types.login: {
      return { ...state, id: action.id }
    }
    case types.logout: {
      return { ...state, id: 0 }
    }
    default:
      return state
  }
}

export const authThunk = () => async (dispatch: any) => {
  const response = await api.auth.me()
  if (response.status === 200 && response.data.resultCode === 0) {
    dispatch({
      type: types.authMe,
      data: response.data.data
    })
  }
}
export const loginThunk = (data: any) => async (dispatch: any) => {
  const response = await api.auth.loginPOST(data)
  if (response.status === 200 && response.data.resultCode === 0) {
    dispatch({
      type: types.login,
      id: response.data.data.userId
    })
  }
}
export const logoutThunk = () => async (dispatch: any) => {
  const response = await api.auth.loginDELETE()
  if (response.status === 200 &&
    response.data.resultCode === 0) dispatch({ type: types.logout })
}
