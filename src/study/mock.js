export const courses = [
  {
    name: 'SSR5.0标准版实施培训',
    percent: 0.2,
    deadline: Date.now(),
    key: 1
  },
  {
    name: '2017第三期新产品培训',
    percent: 0.5,
    deadline: Date.now(),
    key: 2
  },
  {
    name: '服务申请功能介绍说明（一线工程师）',
    percent: 1,
    deadline: Date.now(),
    key: 3
  },
  {
    name: 'SSR5.0标准版实施培训',
    percent: 0.2,
    deadline: Date.now(),
    key: 4
  },
  {
    name: '2017第三期新产品培训',
    percent: 0.5,
    deadline: Date.now(),
    key: 5
  },
  {
    name: '服务申请功能介绍说明（一线工程师）',
    percent: 1,
    deadline: Date.now(),
    key: 6
  }
]

export const mycourses = [
  {
    name: 'SSR5.0标准版实施培训',
    percent: 0.2,
    times: 1,
    hours: 1.5,
    key: 1
  },
  {
    name: '2017第三期新产品培训',
    percent: 0.5,
    times: 1,
    hours: 1.5,
    key: 2
  },
  {
    name: '服务申请功能介绍说明（一线工程师）',
    percent: 1,
    times: 2,
    hours: 1.5,
    key: 3
  },
  {
    name: 'SSR5.0标准版实施培训',
    percent: 0.2,
    times: 1,
    hours: 1.5,
    key: 4
  },
  {
    name: '2017第三期新产品培训',
    percent: 0.5,
    times: 1,
    hours: 1.5,
    key: 5
  },
  {
    name: '服务申请功能介绍说明（一线工程师）',
    percent: 1,
    times: 2,
    hours: 1.5,
    key: 6
  },
  {
    name: '2017第三期新产品培训',
    percent: 0.5,
    times: 1,
    hours: 1.5,
    key: 7
  },
  {
    name: '服务申请功能介绍说明（一线工程师）',
    percent: 1,
    times: 2,
    hours: 1.5,
    key: 8
  }
]

export const allcourses = [
  {
    name: '北京邮政 存储部分 1',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }, {
    name: '北京邮政 存储部分 2',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }, {
    name: '北京邮政 存储部分 3',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }, {
    name: '北京邮政 存储部分 4',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }, {
    name: '北京邮政 存储部分 5',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }, {
    name: '北京邮政 存储部分 6',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }, {
    name: '北京邮政 存储部分 7',
    seq: 'L00648',
    type: '在线课程',
    mode: '视频',
    hours: 10,
    score: 10,
    condition: '通过考试,学习学时大于等于课程学时'
  }
].map((o, i) => {
  o.key = i + 1
  return o
})