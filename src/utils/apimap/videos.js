const LOCAL = '/api'

module.exports = [
  {
    id: 'fetchVideos',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/videocenter`
    }
  }, {
    id: 'recordProgress',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/videoprogress`
    }
  }
]