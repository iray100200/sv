import * as actions from '../actions'

const initialState = {
  allCourses: {},
  myCourses: {},
  history: {
    list: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_COURSES:
      return { ...state, allCourses: action.data }
    case actions.FETCH_LEARN_HIS:
      return { ...state, history: action.data }
    case actions.FETCH_MY_COURSES:
      return { ...state, myCourses: action.data }
    default:
      return { ...state }
  }
}