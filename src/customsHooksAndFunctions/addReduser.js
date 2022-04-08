class ActionsClass {
  constructor () {
    this.arrayOfTypeNames = []
    this._dispatch = undefined
    this.dispatching = true
    this.params = { conspare: 'conspare_in_console' }
  }

  actionCreator (type, data) {
    this.arrayOfTypeNames.push(type)
    return { type, data }
  }

  addReduser (state, action) {
    if (Object.keys(action).length === 1) {
      return state
    }
    for (let i = 0; i < this.arrayOfTypeNames.length; i++) {
      if (action.type !== this.arrayOfTypeNames[i]) {
        continue
      }
      return { ...state, ...action.data }
    }
    return state
  }
}

export default function ActionsRedux () {
  const AR = new ActionsClass()
  return [
    (state, action) => AR.addReduser(state, action),
    (type, data) => {
      if (AR._dispatch) {
        return ((dispatch) => dispatch(AR.actionCreator(type, data)))(AR._dispatch)
      } else return AR.actionCreator(type, data)
    },
    (dispatch) => {
      AR._dispatch = dispatch
    }
  ]
}
