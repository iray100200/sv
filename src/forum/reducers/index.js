import * as actions from '../actions'

const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_FORUM_DATA:
      return { ...state, data: action.data }
    default:
      return { ...state }
  }
}