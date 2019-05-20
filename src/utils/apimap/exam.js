const LOCAL = `http://47.96.129.81:9091`

export default [
  {
    id: 'fetchExamList',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/userwillexam`
    }
  }, {
    id: 'fetchExamInfo',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/startexam`
    }
  }, {
    id: 'replyQuestion',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/reply`
    }
  }
]