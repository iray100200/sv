import * as actions from '../actions'

const initialState = {
  detail: null,
  comments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_DETAIL:
      return { ...state, detail: action.data }
    case actions.FETCH_COMMENTS:
      return { ...state, comments: action.data }
    default:
      return { ...state }
  }
}