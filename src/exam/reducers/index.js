import * as actions from '../actions'

const initialState = {
  percent: 0,
  failed: 0,
  passed: 0,
  completed: 0,
  total: 0,
  records: {
    list: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_EXAM_LIST:
      return { ...state, records: action.data, passed: action.passed, failed: action.failed, percent: action.percent, completed: action.completed, total: action.total }
    default:
      return { ...state }
  }
}