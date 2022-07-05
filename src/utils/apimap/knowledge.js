const LOCAL = '/api'

module.exports = [
  {
    id: 'fetchKnowledge',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/knowledge`
    }
  }, {
    id: 'searchKnowledge',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/knowledge`
    }
  }, {
    id: 'fetchKnowledgeTypes',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/knowledges2`
    }
  }
]