import s from "./User.module.css";
import image from "./../../../../Imeges/images.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../../../API/api";

export const User = (props) => {
    const user = {...props};
    let [followed, setFollow] = useState(user.followed);
    const navigate = useNavigate();
    const followedClick = async () => {
        let response;
        if (followed) {
            response = await api.follow.deleteFollow(user.id);
            if (+response.status === 200 && +response.data.resultCode === 0) setFollow(false);
        } else {
            response = await api.follow.postFollow(user.id);
            if (+response.status === 200 && +response.data.resultCode === 0) setFollow(true);
        }
    }
    const clickFoto = () => {
        navigate('/profile/' + user.id, {replace: true});
    }
    useEffect(() => setFollow(user.followed), [user.followed]);

    return <div id={s.user}>
            {user.photos.small ? <img id={s.foto} src={user.photos.small} onClick={clickFoto} alt={'no find image'}/> :
            <img id={s.foto} src={image} onClick={clickFoto} alt={'no find image'}/>}
        <div id={s.userName} onClick={clickFoto}>
            {user.name}
            <div>(ID: {user.id})</div></div>
            <button onClick={followedClick}>{followed ? 'follow' : 'unfollow'}</button>
        <div>

        </div>
    </div>
}