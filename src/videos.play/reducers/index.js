import * as actions from '../actions'

const initialState = {
  layout: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.HOME_FETCH:
      return { ...state, layout: action.data }
    default:
      return { ...state }
  }
}