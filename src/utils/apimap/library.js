export default [
  {
    id: 'fetchLibraryList',
    method: 'get',
    urls: {
      local: 'http://localhost:7001/api/library/select'
    }
  }, {
    id: 'importLibraryList',
    method: 'post',
    contentType: 'application/json',
    urls: {
      local: 'http://localhost:7001/api/library/import'
    }
  }
]