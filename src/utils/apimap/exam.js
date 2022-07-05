const LOCAL = '/api'

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
  }, {
    id: 'stopExam',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/stopexam`
    }
  }, {
    id: 'endExam',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/endexam`
    }
  }, {
    id: 'queryExamResult',
    method: 'get',
    urls: {
      local: `${LOCAL}/f/v1/userexamitemdetail`
    }
  }
]