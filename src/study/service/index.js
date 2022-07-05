import exceed from 'utils/apimap'

export function fetchLibrary(data) {
  return new Promise((resolve, reject) => {
    exceed.fetch({
      api: 'fetchLibraryList',
      data
    }).then(res => {
      if (res.success) {
        resolve(res.data)
      }
    })
  })
}

export function importLibrary(data) {
  return new Promise((resolve, reject) => {
    exceed.fetch({
      api: 'importLibraryList',
      data
    }).then(res => {
      if (res.success) {
        resolve(res.data)
      }
    })
  })
}

export function startCourse(data) {
  return new Promise((resolve, reject) => [
    exceed.fetch({
      api: 'startCourse',
      data
    }).then(res => {
      if (res.success) {
        resolve(res.data)
      }
    })
  ])
}