import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Main } from './components/Main/Main'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authThunk } from './redux/auth'
import { getUsersThunk } from './redux/users'
import { Header } from './components/Header/Header'
import { useNavigate } from 'react-router-dom'

function App () {
  const [users, auth] = [useSelector(state => state.users), useSelector(state => state.auth)]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(authThunk())
    dispatch(getUsersThunk(users.count, users.page, users.term, users.friends))
    if (auth.id) navigate(`profile/${auth.id}`)
  }, [auth.id])
  return (
    <div className={styles.App}>
      <Header/>
      <Sidebar/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
