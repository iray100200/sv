import Exceed from 'exceed'
import Library from './library'
import Courses from './courses'
import Exam from './exam'

const LOCAL = `http://47.96.129.81:9091`

const exceed = new Exceed({
  csrf: false,
  ENV: 'local',
  urlencode: false
})

exceed.use([
  {
    id: 'login',
    method: 'get',
    withToken: false,
    urls: {
      local: `${LOCAL}/f/v1/login`
    }
  },
  {
    id: 'fetchForumData',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/forums`
    }
  },
  {
    id: 'fetchForumComments',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/commentByForumId`
    }
  },
  {
    id: 'postForumData',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/forum`
    }
  },
  ...Library,
  ...Courses,
  ...Exam
])

exceed.interceptors.request.push((requestParams, config) => {
  if (requestParams.withToken) {
    requestParams.data = {
      ...requestParams.data,
      token: localStorage.getItem('token')
    }
  }
})

exceed.interceptors.response.success.push((responseData, config, originRequest) => {
  if (config.withToken && responseData.code !== 0) {
    if (responseData.code === -3) {
      location.href = '/login'
    }
  }
})

export default exceed