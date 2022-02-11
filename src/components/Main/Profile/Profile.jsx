import s from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk} from "../../../redux/profile";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import profilePhoto from '../../../Imeges/images.png';
import ProfileStatus from "./ProfileStatus";
import setting from '../../../Imeges/setting.png';


export let Profile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.profile);
    const contacts = ((contacts) => {
        const result = [];
        for (let i in contacts) {
            if (contacts[i]) result.push([i, contacts[i]]);
        }
        return result;
    })(user.contacts);
    let [hidden, setHidden] = useState(true);
    useEffect(() => {
        if (!isNaN(+params.id)) {
            dispatch(profileThunk(params.id)).then(res => setHidden(res))
        }
        return setHidden(true);
    }, [params.id]);
    let keyMap = 1;
    return <section hidden={hidden}>
        <div id={s.profile}>
            <div id={s.profilePhoto}>
                {
                    user.photos.large ? <img className={s.photo} src={user.photos.large} alt={'photo not found'}/> :
                        <img className={s.photo} src={profilePhoto} alt={'photo not found'}/>
                }
                <ProfileStatus/>
            </div>
            <div id={s.profileData}>
                <div id={s.fullName}>
                    {user.fullName + ' (id: ' + user.userId + ')'}<NavLink to={`/profileForm`}>
                    {auth.id == params.id && <img className={s.settImg} src={setting} alt={'No find image...'}/>}
                </NavLink>
                </div>
                <div id={s.aboutMe}>{user.aboutMe && <span>{user.aboutMe}</span>}</div>
                {user.lookingForAJob ? <div id={s.lookingForAJob}>
                    Ищю работу: {user.lookingForAJobDescription}
                </div> : ''}
                {contacts.length ? <>
                    Contacts:
                    <table>
                        <thead/>
                        <tbody>{
                            contacts.map((elem) => {
                                    return elem[1] ? <tr key={keyMap++}>
                                        {/*<td>{elem[0]}:</td>*/}
                                        <td>{elem[1]}</td>
                                    </tr> : '';
                                }
                            )
                        }</tbody>
                        <tfoot/>
                    </table>
                </> : ''}
            </div>
        </div>
    </section>
}
