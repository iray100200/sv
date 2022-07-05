import * as actions from '../actions'

const initialState = {
  video: {},
  record: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_VIDEO:
      return { ...state, video: action.detail, record: action.record }
    default:
      return { ...state }
  }
}