import s from "./Footer.module.css";
import {NavLink} from "react-router-dom";
//import {useDispatch, useSelector} from "react-redux";
export const Footer = () =>{
    //let state = useSelector(state=>state);
    //let dispatch = useDispatch()
    return <footer id={s.footer}>
        <div id={s.contacts}>
            <a href={'https://www.youtube.com/channel/UCTW0FUhT0m-Bqg2trTbSs0g'} target='_blank' rel='noopener noreferrer'>YouTube channel</a>
            <a href='https://social-network.samuraijs.com/' target='_blank' rel='noopener noreferrer'>https://social-network.samuraijs.com/</a>
            <a href={'https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&index=1'} target='_blank' rel='noopener noreferrer'>YouTube course</a>
        </div>
        <div id={s.myContacts}>
            My contacts:
            <div>minigamenickname@gmail.com</div>
            <div>AKhomyt@gmail.com</div>
            <div><NavLink to={'profile/19853'}>I am</NavLink></div>
        </div>
    </footer>
}