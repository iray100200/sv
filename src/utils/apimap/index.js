import Exceed from 'exceed'
import Courses from './courses'
import Exam from './exam'
import Videos from './videos'
import Knowledge from './knowledge'
import Admin from './admin'

const LOCAL = '/api'

const exceed = new Exceed({
  csrf: false,
  ENV: 'local',
  urlencode: false
})

exceed.use([
  {
    id: 'fetchUserInfo',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/userinfo`
    }
  },
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
  {
    id: 'updateForumData',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/forum`
    }
  },
  {
    id: 'fetchForumItemData',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/forum`
    }
  },
  {
    id: 'commentForumItem',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/comment`
    }
  },
  ...Courses,
  ...Exam,
  ...Videos,
  ...Knowledge,
  ...Admin
])

exceed.interceptors.request.push((requestParams, config) => {
  if (requestParams.withToken === void(0) || requestParams.withToken) {
    requestParams.data = {
      ...requestParams.data,
      token: window.token
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