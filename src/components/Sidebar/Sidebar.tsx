import s from './Sidebare.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authType } from '../../redux/auth'

export const Sidebar = () => {
  const myProfileID = useSelector((state: { auth: authType }) => state.auth.id)
  const authID = useSelector((state: { auth: authType }) => state.auth.id)
  return <aside id={s.sidebar}>
    {authID ? <NavLink to={`profile/${myProfileID}`}>Profile</NavLink> : <></>}
    <NavLink to={'users'}>users</NavLink>
  </aside>
}
