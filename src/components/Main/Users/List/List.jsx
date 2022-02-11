import s from "./List.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setFriendsThunk, setPageThunk, setTermThunk} from "../../../../redux/users";

export const List = () => {
    let dispatch = useDispatch();
    let users = useSelector(state => state.users);
    let authId = useSelector(state => state.auth.id);
    const listArray = [];
    for (let i = 0; i < Math.ceil(users.totalCount / users.count); i++) {
        listArray.push(Math.ceil(users.totalCount / users.count) - i);
    }
    const elemListClick = e => {
        dispatch(setPageThunk(Math.ceil(users.totalCount / users.count) + 1 - +e.target.innerText))
    }
    const findBlur = e => {
        dispatch(setTermThunk(e.target.value));
    }
    const findSubmit = e => {
        e.preventDefault();
        e.target[0].blur();
    }
    const checkboxChenge = e => {
        dispatch(setFriendsThunk(e.target.checked));
    }
    let keyMap = 1;
    return <div id={s.container}>
        <div id={s.list}>{listArray.map(elem => <span key={'l1' + keyMap++} onClick={elemListClick}
                                                      className={s.listElements}>{elem} </span>)}</div>
        <label>
            {
                authId ? <form onSubmit={findSubmit}>
                    Find: <input name={'find'} type={'text'} onBlur={findBlur} size={17}/>
                    Friends: <input name={'friends'} type={'checkbox'} onChange={checkboxChenge}/>
                    {/*{allUsers.length === 0 ? <button onClick={clickGetAllUsers}>Get All Users</button> : <div>*/}
                    {/*    <button onClick={clickWithAvatar}>With Avatar</button>*/}
                    {/*    <div id={s.list}>{listArray.map(elem => <span key={'l2' + keyMap++} onClick={allUsersListClick} className={s.listElements}>{elem} </span>)}</div>*/}
                    {/*</div>}*/}
                </form> : ''
            }
        </label>
    </div>
}