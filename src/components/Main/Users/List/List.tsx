import s from './List.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFriendsThunk, setPageThunk, setTermThunk, userType } from '../../../../redux/users'
import { authType } from '../../../../redux/auth'
import React from 'react'

export const List = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: {users: userType}) => state.users)
  const authId = useSelector((state: {auth: authType}) => state.auth.id)
  const listArray = []
  for (let i = 0; i < Math.ceil(users.totalCount / users.count); i++) {
    listArray.push(Math.ceil(users.totalCount / users.count) - i)
  }
  const elemListClick = (e: any) => {
    dispatch(setPageThunk(Math.ceil(users.totalCount / users.count) + 1 - +e.target.innerText))
  }
  const findBlur = (e: any) => {
    dispatch(setTermThunk(e.target.value))
  }
  const findSubmit = (e: any) => {
    e.preventDefault()
    e.target[0].blur()
  }
  const checkboxChenge = (e: any) => {
    dispatch(setFriendsThunk(e.target.checked))
  }
  let keyMap = 1
  return <div id={s.container}>
    <div id={s.list}>{listArray.map(elem => <span key={'l1' + keyMap++} onClick={elemListClick}
                                                  className={s.listElements}>{elem} </span>)}</div>
    <label>
      Find: <input name={'find'} type={'text'} onBlur={findBlur} size={17}/>
      {authId
        ? <form onSubmit={findSubmit}>Friends: <input name={'friends'} type={'checkbox'} onChange={checkboxChenge}/>
        </form>
        : ''}
    </label>
  </div>
}
