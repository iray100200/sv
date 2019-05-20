import * as actions from '../actions'

const initialState = {
  records: {
    list: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_EXAM_LIST:
      return { ...state, records: action.data }
    default:
      return { ...state }
  }
}