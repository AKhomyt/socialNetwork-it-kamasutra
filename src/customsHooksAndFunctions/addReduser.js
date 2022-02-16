class ActionsClass {
    constructor() {
        this.arrayOfTypeNames = [];
        this._dispatch = undefined;
        this.previousAction = {};
        this.dispatching = true;
        this.params = {conspare: 'conspare_in_console'}
    }

    actionCreator(type, data) {
        this.arrayOfTypeNames.push(type);
        return {type, data};
    }

    addReduser(state, action) {
        if (Object.keys(action).length === 1) {
            return state;
        }
        for (let i = 0; i < this.arrayOfTypeNames.length; i++) {
            if (action.type !== this.arrayOfTypeNames[i]) {
                continue;
            }
            return {...state, ...action.data};
        }
        return state;
    }

    compareActions(previousAction, action) {
        function compare(pA, a) {
            let result = [];
            if (Array.isArray(a)) {
                for (let element = 0; element < a.length; element++) {
                    if (typeof a[element] === 'object' || Array.isArray(a[element])) {
                        result.push(compare(pA[element], a[element]));
                    } else {
                        if (pA[element] !== a[element]) {
                            result.push(true);
                            return result;
                        } else result.push(false);
                    }
                }
            } else for (let property in a) {
                if (typeof a[property] === 'object' || Array.isArray(a[property])) {
                    result.push(compare(pA[property], a[property]));
                } else {
                    if (pA[property] !== a[property]) {
                        result.push(true);
                        return result;
                    } else result.push(false);

                }
            }
            result = result.flat(Infinity);
            return result;
        }

        for (let i of compare(previousAction, action)) {
            if (i === true) return true
        }
        return false;
    }
}

export default function ActionsRedux() {
    let AR = new ActionsClass();
    return [
        (state, action) => AR.addReduser(state, action),
        (type, data) => {
            if (AR._dispatch) {
                return ((dispatch) => dispatch(AR.actionCreator(type, data)))(AR._dispatch);
            } else return AR.actionCreator(type, data);
        },
        (dispatch) => {
            AR._dispatch = dispatch
        },
    ]
}

/*
let initializationState = {...};
-const btanchState = (state = initializationState, action) => {
-    switch (action.type) {
-        default: state;
-    }
-}
+const [addReducer, actionCreater, setDispatch] = ActionRedux();
+const btanchState = (state = initializationState, action)=> addReducer(state, action);

-const actionCreator = (dataAC)=> ({type: 'type', dataAC});
+const actionCreator = (dataAC)=> setActionCreater('type', dataAC);;
const thunk = (data)=> dispatch => {
    dispatch(setActionCreater('type', data));//case 'type': return {...state, data};
    or
    setDispatch(dispatch);
    setActionCreater('type_1', data_1);
    setActionCreater('type_2', data_2);
    setActionCreater('type_3', data_3);
    ...
}
*/