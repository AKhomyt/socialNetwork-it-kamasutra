import s from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { profileThunk, profileType } from '../../../redux/profile'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import profilePhoto from '../../../Imeges/images.png'
import ProfileStatus from './ProfileStatus'
import setting from '../../../Imeges/setting.png'
import { authType } from '../../../redux/auth'

export const Profile = () => {
  const dispatch: any = useDispatch()
  const params: any = useParams()
  const auth = useSelector((state: { auth: authType }) => state.auth)
  const user: any = useSelector((state: { profile: profileType}) => state.profile)
  const contacts = ((contacts: any) => {
    const result = []
    for (const i in contacts) {
      if (contacts[i]) result.push([i, contacts[i]])
    }
    return result
  })(user.contacts)
  // eslint-disable-next-line prefer-const
  let [hidden, setHidden] = useState(true)
  useEffect(() => {
    if (!isNaN(+params.id)) {
      dispatch(profileThunk(params.id)).then((res: any) => setHidden(res))
    }
    return setHidden(true)
  }, [params.id])
  let keyMap = 1
  return <section hidden={hidden}>
    <div id={s.profile}>
      <div id={s.profilePhoto}>
        {
          user.photos.large
            ? <img className={s.photo} src={user.photos.large} alt={'photo not found'}/>
            : <img className={s.photo} src={profilePhoto} alt={'photo not found'}/>
        }
        <ProfileStatus/>
      </div>
      <div id={s.profileData}>
        <div id={s.fullName}>
          {user.fullName + ' (id: ' + user.userId + ')'}<NavLink to={'/profileForm'}>
          {+auth.id === +params.id && <img className={s.settImg} src={setting} alt={'No find image...'}/>}
        </NavLink>
        </div>
        <div id={s.aboutMe}>{user.aboutMe && <span>{user.aboutMe}</span>}</div>
        {
          user.lookingForAJob
            ? <div id={s.lookingForAJob}><span
              style={{ color: '#ffc' }}>looking for a job:</span> {user.lookingForAJobDescription}
            </div>
            : ''
        }
        {
          contacts.length
            ? <>
              Contacts
              <table>
                <thead/>
                <tbody>{
                  contacts.map((elem) => {
                    return elem[1]
                      ? <tr key={keyMap++}>
                        <td>{elem[1]}</td>
                      </tr>
                      : ''
                  })
                }</tbody>
                <tfoot/>
              </table>
            </>
            : ''
        }
      </div>
    </div>
  </section>
}
