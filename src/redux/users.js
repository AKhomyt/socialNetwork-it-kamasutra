import {api} from "../API/api";
import ActionsRedux from "../customsHooksAndFunctions/addReduser";

let initializationState = {
    count: 10,
    page: 1,
    term: null,
    friend: null,
    allUsers: null,
    items: [
        {
            name: '',
            id: null,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false
        },
    ],
    totalCount: 0,
    error: null
}
const [addReducer, setActionCreater] = ActionsRedux();

export const users = (state = initializationState, action) => addReducer(state, action);
const getUsersAC = (users) => setActionCreater('getUsers', users);
export const getUsersThunk = (count, page, term, friend) => async (dispatch) => {
    let response = await api.users(count, page, term, friend);
    if (response.status === +200) {
        dispatch(getUsersAC(response.data));
    }
}
const setCountAC = (count) => setActionCreater('setCount', {count});
export const setCountThunk = count => dispatch => {
    dispatch(setCountAC(count));
}
const setPageAC = (page) => setActionCreater('setPage', {page});
export const setPageThunk = page => dispatch => {
    dispatch(setPageAC(page));
}
const setTarmAC = (term) => setActionCreater('setTerm', {term});
export const setTermThunk = term => dispatch => {
    dispatch(setPageAC(1));
    dispatch(setTarmAC(term));
}
const setFriendsAC = (friend) => setActionCreater('setFriends', {friend});
export const setFriendsThunk = friend => dispatch => {
    dispatch(setPageAC(1));
    dispatch(setFriendsAC(friend));
}
export const setAllUsers = (setLocalState) => async (dispatch, setState) => {
    let response = await api.users(100, 1);
    let usersArray = response.data.items;
    let totalCount = setState().users.totalCount;

    for (let i = 2; i < Math.ceil(totalCount / 100) + 1; i++) {
        response = await api.users(100, i);
        usersArray.push(response.data.items);
    }
    usersArray = usersArray.flat(Infinity);
    const resultArray = [];
    for (let elem = 0, page = 1; page < Math.ceil(totalCount / setState().users.count) && elem < totalCount;) {
        const array = []
        for (let i= 0; i < setState().users.count; i++){
            array.push(usersArray[elem++]);
        }
        resultArray.push(array);
    }
    setLocalState(resultArray);
}
export const withAvatar = () => (dispatch, setState) => {
    let resultArray = setState().users.allUsers;
    for (let i = 0; i < resultArray.length; i++) {
        if (typeof resultArray[i].photos.small !== 'string') {
            resultArray.splice(i, 1);
            i--;
        }

    }
    dispatch(getUsersAC({...setState().users, items: resultArray}));
}
