import ActionsRedux from "../customsHooksAndFunctions/addReduser";

// eslint-disable-next-line no-unused-vars
const [addReducer, AC, setDispatch] = ActionsRedux();
export const testing = (state = {}, action)=> addReducer(state, action);

// eslint-disable-next-line no-unused-vars
export const test_thunk_1 = args => (dispatch, setState)=> {
    setDispatch(dispatch);

}