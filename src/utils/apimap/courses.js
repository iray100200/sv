const LOCAL = `http://47.96.129.81:9091`

module.exports = [
  {
    id: 'fetchCourseCaegories',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/coursecategorys`
    }
  }, {
    id: 'fetchBooks',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/books`
    }
  }, {
    id: 'fetchBookTypes',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/booktype`
    }
  }, {
    id: 'fetchBooksAndTypes',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/typeAndBooks`
    }
  }, {
    id: 'fetchUserCourses',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/usercourses`
    }
  }, {
    id: 'fetchAllCourses',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/allcourses`
    }
  }, {
    id: 'fetchLearningHistory',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/usercourserecords`
    }
  }
]