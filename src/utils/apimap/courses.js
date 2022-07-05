const LOCAL = '/api'

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
      local: `${LOCAL}/f/v1/usercourserecordslike`
    }
  }, {
    id: 'fetchCourseDetail',
    method: 'get',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/coursedetail`
    }
  }, {
    id: 'subscribeCourse',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/usercourse`
    }
  }, {
    id: 'startCourse',
    method: 'post',
    withToken: true,
    urls: {
      local: `${LOCAL}/f/v1/userstartcourse`
    }
  }
]