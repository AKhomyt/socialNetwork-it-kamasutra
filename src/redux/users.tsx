import { api } from '../API/api'

const userState = {
  count: 10,
  page: 1,
  term: null,
  friend: null,
  allUsers: null,
  items: [
    {
      name: '',
      id: null,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null
      },
      status: null,
      followed: false
    }
  ],
  totalCount: 0,
  error: null
}
export type userType = typeof userState
const types = {
  getUsers: 'getUsers',
  setCount: 'setCount',
  setPage: 'setPage',
  setTerm: 'setTerm',
  setFriends: 'setFriends'
}
export const users = (state = userState, action: { type: string, [key: string]: any }) => {
  switch (action.type) {
    case types.getUsers: {
      return { ...state, ...action.users }
    }
    case types.setCount: {
      return { ...state, count: action.count }
    }
    case types.setPage: {
      return { ...state, page: action.page }
    }
    case types.setTerm: {
      return { ...state, term: action.term }
    }
    case types.setFriends: {
      return { ...state, friend: action.friend }
    }
    default:
      return state
  }
}

const getUsersAC = (users: any) => ({ type: types.getUsers, users })
export const getUsersThunk = (count: any, page: any, term: any, friend: any) => async (dispatch: any) => {
  const response = await api.users(count, page, term, friend)
  if (response.status === +200) {
    dispatch(getUsersAC(response.data))
  }
}
const setCountAC = (count: any): { type: string, count: any } => ({ type: types.setCount, count })
export const setCountThunk = (count: any) => (dispatch: any) => {
  dispatch(setCountAC(count))
}
const setPageAC = (page: any): { type: string, page: any } => ({ type: types.setPage, page })
export const setPageThunk = (page: any) => (dispatch: any) => {
  dispatch(setPageAC(page))
}
const setTarmAC = (term: any): { type: string, term: any } => ({ type: types.setTerm, term })
export const setTermThunk = (term: any) => (dispatch: any) => {
  dispatch(setPageAC(1))
  dispatch(setTarmAC(term))
}
const setFriendsAC = (friend: any): { type: string, friend: any } => ({ type: types.setFriends, friend })
export const setFriendsThunk = (friend: any) => (dispatch: any) => {
  dispatch(setPageAC(1))
  dispatch(setFriendsAC(friend))
}
export const setAllUsers = (setLocalState: any) => async (dispatch: any, setState: any) => {
  let response = await api.users(100, 1)
  let usersArray = response.data.items
  const totalCount = setState().users.totalCount

  for (let i = 2; i < Math.ceil(totalCount / 100) + 1; i++) {
    response = await api.users(100, i)
    usersArray.push(response.data.items)
  }
  usersArray = usersArray.flat(Infinity)
  const resultArray = []
  for (let elem = 0, page = 1; page < Math.ceil(totalCount / setState().users.count) && elem < totalCount;) {
    const array = []
    for (let i = 0; i < setState().users.count; i++) {
      array.push(usersArray[elem++])
    }
    resultArray.push(array)
  }
  setLocalState(resultArray)
}
export const withAvatar = () => (dispatch: any, setState: any) => {
  const resultArray = setState().users.allUsers
  for (let i = 0; i < resultArray.length; i++) {
    if (typeof resultArray[i].photos.small !== 'string') {
      resultArray.splice(i, 1)
      i--
    }
  }
  dispatch(getUsersAC({ ...setState().users, items: resultArray }))
}
