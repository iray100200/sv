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

export function fetchUserCourses(courseName = '') {
  return dispatch => exceed.fetch({
    api: 'fetchUserCourses',
    data: {
      courseName
    }
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_MY_COURSES,
        data: res.body
      })
    }
  })
}

export function fetchAllCourses(courseName = '') {
  return dispatch => exceed.fetch({
    api: 'fetchAllCourses',
    data: {
      courseName
    }
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_ALL_COURSES,
        data: res.body
      })
    }
  })
}

export function fetchLearningHistory(courseName = '') {
  return dispatch => exceed.fetch({
    api: 'fetchLearningHistory',
    data: {
      courseName
    }
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_LEARN_HIS,
        data: res.body
      })
    }
  })
}

export function subscribeCourse(data) {
  return exceed.fetch({
    api: 'subscribeCourse',
    data
  })
}