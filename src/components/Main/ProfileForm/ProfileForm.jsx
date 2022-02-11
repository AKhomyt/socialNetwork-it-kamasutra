import s from "./ProfileForm.module.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setProfileThunk} from "../../../redux/profile";

export default function ProfileForm() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    let authId = useSelector(state => state.auth.id);
    let profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = data => {
        data = {
            "aboutMe": data.aboutMe,
            "lookingForAJob": data.lookingForAJob,
            "lookingForAJobDescription": data.lookingForAJobDescription,
            "fullName": data.fullName,
            "contacts": {
                facebook: data.facebook,
                github: data.github,
                instagram: data.instagram,
                mainLink: data.mainLink,
                twitter: data.twitter,
                vk: data.vk,
                website: data.website,
                youtube: data.youtube
            },
        }
        dispatch(setProfileThunk(data));
        navigate('/profile/' + authId, {replace: true});
    }
    watch;
    //console.log(watch("example")); // watch input value by passing the name of it
    errors;
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} id={s.profileForm}>
            <table>
                <tbody>
                <tr>
                    <td colSpan={2} valign={'middle'}>
                        aboutMe:
                        <textarea defaultValue={profile.aboutMe || 'Обо мне...'}
                                  cols={30} rows={10}
                                  style={{resize: 'none'}}
                                  placeholder={'Обо мне...'}
                                  {...register("aboutMe", {maxLength:1000})}/>
                    </td>
                </tr>
                <tr>
                    <td>lookingForAJob</td>
                    <td><input defaultChecked={profile.lookingForAJob}
                               type='checkbox'
                               {...register("lookingForAJob")}/></td>
                </tr>
                <tr>
                    <td>lookingForAJobDescription</td>
                    <td><input defaultValue={profile.lookingForAJobDescription || 'Я специалист в сфере...'}
                               {...register("lookingForAJobDescription")}
                               autoComplete="off"
                    /></td>
                </tr>
                <tr>
                    <td>fullName</td>
                    <td><input defaultValue={profile.fullName} {...register("fullName")}
                               autoComplete="off"
                    /></td>
                </tr>
                </tbody>
            </table>
            <table>
                <thead>
                <tr>
                    <td>contacts</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>github</td>
                    <td><input defaultValue={profile.contacts.github} {...register("github")} /></td>
                </tr>
                <tr>
                    <td>vk</td>
                    <td><input defaultValue={profile.contacts.vk} {...register("vk")} /></td>
                </tr>
                <tr>
                    <td>facebook</td>
                    <td><input defaultValue={profile.contacts.facebook} {...register("facebook")} /></td>
                </tr>
                <tr>
                    <td>instagram</td>
                    <td><input defaultValue={profile.contacts.instagram} {...register("instagram")} /></td>
                </tr>
                <tr>
                    <td>twitter</td>
                    <td><input defaultValue={profile.contacts.twitter} {...register("twitter")} /></td>
                </tr>
                <tr>
                    <td>website</td>
                    <td><input defaultValue={profile.contacts.website} {...register("website")} /></td>
                </tr>
                <tr>
                    <td>youtube</td>
                    <td><input defaultValue={profile.contacts.youtube} {...register("youtube")} /></td>
                </tr>
                <tr>
                    <td>mainLink</td>
                    <td><input defaultValue={profile.contacts.mainLink} {...register("mainLink")} /></td>
                </tr>
                </tbody>
            </table>


            {/*/!* register your input into the hook by invoking the "register" function *!/*/}
            {/*<input defaultValue="test" {...register("example")} />*/}

            {/*/!* include validation with required or other standard HTML validation rules *!/*/}
            {/*<input {...register("exampleRequired", { required: true })} />*/}
            {/*/!* errors will return when field validation fails  *!/*/}
            {/*{errors.exampleRequired && <span>This field is required</span>}*/}

            <input type="submit"/><input type="reset"/>
        </form>
    );
}
/*
                "aboutMe": "я круто чувак 1001%",
                "contacts": {
                    facebook: "facebook.com",
                    github: "github.com",
                    instagram: "instagra.com/sds",
                    mainLink: null,
                    twitter: "https://twitter.com/@sdf",
                    vk: "vk.com/dimych",
                    website: null,
                    youtube: null
                },
                "lookingForAJob": true,
                "lookingForAJobDescription": 'не ищу',
                "fullName": "samurai d"
 */