import namespace from '../../utils/index'
import exceed from '../../utils/apimap'

const NS = namespace()
export const FETCH_COURSES = NS('FETCH_COURSES')
export const FETCH_MY_COURSES = NS('FETCH_MY_COURSES')
export const FETCH_ALL_COURSES = NS('FETCH_ALL_COURSES')
export const FETCH_LEARN_HIS = NS('FETCH_LEARN_HIS')

export function fetchCourseCaegories() {
  return dispatch => exceed.fetch({
    api: 'fetchCourseCaegories'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_COURSES,
        data: res.body
      })
    }
  })
}

export function fetchUserCourses(data) {
  return dispatch => exceed.fetch({
    api: 'fetchUserCourses',
    data
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_MY_COURSES,
        data: res.body
      })
    }
  })
}

export function fetchAllCourses() {
  return dispatch => exceed.fetch({
    api: 'fetchAllCourses'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_ALL_COURSES,
        data: res.body
      })
    }
  })
}

export function fetchLearningHistory() {
  return dispatch => exceed.fetch({
    api: 'fetchLearningHistory'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_LEARN_HIS,
        data: res.body
      })
    }
  })
}