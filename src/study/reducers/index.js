import * as actions from '../actions'

const initialState = {
  allCourses: {},
  history: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_COURSES:
      return { ...state, allCourses: action.data }
    case actions.FETCH_LEARN_HIS:
      return { ...state, history: action.data }
    default:
      return { ...state }
  }
}