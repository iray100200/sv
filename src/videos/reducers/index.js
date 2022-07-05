import * as actions from '../actions'

const initialState = {
  videos: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_VIDEOS:
      return { ...state, videos: action.data }
    default:
      return { ...state }
  }
}