const LOCAL = 'http://121.40.106.81:8080'

module.exports = [
  {
    id: 'fetchAllSurveyList',
    method: 'get',
    withToken: false,
    urls: {
      local: LOCAL + '/api/survey'
    }
  },
  {
    id: 'insertSurveyList',
    method: 'post',
    withToken: false,
    contentType: 'application/json',
    urls: {
      local: LOCAL + '/api/survey/insert'
    }
  },
  {
    id: 'querySurveyItem',
    method: 'get',
    withToken: false,
    urls: {
      local: LOCAL + '/api/survey/item'
    }
  },
  {
    id: 'updateSurveyItem',
    withToken: false,
    method: 'post',
    contentType: 'application/json',
    urls: {
      local: LOCAL + '/api/survey/update'
    }
  },
  {
    id: 'fetchSurveyList',
    method: 'get',
    withToken: false,
    urls: {
      local: LOCAL + '/api/survey/list'
    }
  },
  {
    id: 'submitSurvey',
    method: 'post',
    withToken: false,
    contentType: 'appliction/json',
    urls: {
      local: LOCAL + '/api/survey/submitSurvey'
    }
  },
  {
    id: 'fetchSurveyResultById',
    method: 'get',
    withToken: false,
    urls: {
      local: LOCAL + '/api/survey/resultById'
    }
  }, 
  {
    id: 'removeSurveyItem',
    method: 'get',
    withToken: false,
    urls: {
      local: LOCAL + '/api/survey/delete'
    }
  }
]