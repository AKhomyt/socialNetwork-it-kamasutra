import {useDispatch} from "react-redux";
import {test_thunk_1} from "../../redux/testing";


export const Testing = () => {
    const dispatch = useDispatch()
    dispatch(test_thunk_1());
    return <div>
        23
    </div>
}