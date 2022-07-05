import namespace from 'utils'
import exceed from 'utils/apimap'

const NS = namespace()

export const FETCH_VIDEO = NS('FETCH_VIDEOS')

export function fetchVideo(userCourseId) {
  return dispatch => startCourse({
    userCourseId
  }).then(res => {
    if (res.code === 0) {
      let { videoCourse, videoUserCourseRecord } = res.body
      dispatch({
        type: FETCH_VIDEO,
        detail: videoCourse,
        record: videoUserCourseRecord
      })
    }
  })
}

export function recordProgress(data) {
  return new Promise(resolve => {
    exceed.fetch({
      api: 'recordProgress',
      data
    }).then(res => {
      resolve(res)
    })
  })
}

export function startCourse(data) {
  return exceed.fetch({
    api: 'startCourse',
    data
  })
}