import s from "./Main.module.css";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./Profile/Profile";
import {Users} from "./Users/Users";
import ProfileForm from "./ProfileForm/ProfileForm";
export const Main = () => {
    return <main id={s.main}>
        <Routes>
            <Route path={'/'}>
                <Route exact path="/" element={<ProfileForm />} />
                <Route path={'profileForm'} element={<ProfileForm/>}/>
                <Route path={'profile/:id'} element={<Profile/>}/>
                <Route path={'users'} element={<Users/>}/>
            </Route>
        </Routes>
    </main>
}