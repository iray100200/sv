import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace()

export const FETCH_VIDEOS = NS('FETCH_VIDEOS')

function getImgBase64(url) {
  return url + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_7000,f_jpg,w_400,h_300,m_fast';
}

export function fetchVideos(data, filter = {}) {
  const { statusBy = '', categoryBy = '' } = filter
  return dispatch => exceed.fetch({
    api: 'fetchVideos',
    data
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_VIDEOS,
        data: res.body.list.filter(o => {
          return (!statusBy || o.userCourseLearnStatus === statusBy) && (!categoryBy || o.courseCategoryName === categoryBy)
        }).map(o => {
          o.coursePic = o.coursePic || getImgBase64(o.courseVideo)
          return o
        })
      })
    }
  })
}