import s from "./Users.module.css";
import {useDispatch, useSelector} from "react-redux";
import {List} from "./List/List";
import {User} from "./User/User";
import {useEffect} from "react";
import {getUsersThunk} from "../../../redux/users";

export const Users = () => {
    let users = useSelector(state => state.users);
    let dispatch = useDispatch();

    //----------AllUsers-----------------

    //----------AllUsers-----------------


    useEffect(() => {
            dispatch(getUsersThunk(users.count, users.page, users.term, users.friend));
        },
        [users.count, users.page, users.term, users.friend]);
    let mapKey = 1;
    return users.items ? <div id={s.name}>
        <List/>
        {users.items.map(elem => {
            return <User key={mapKey++} {...elem}/>
        })}
    </div> : <></>
}