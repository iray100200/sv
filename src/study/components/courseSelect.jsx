import React from 'react'
import CourseInfo from './courseInfo'
import { Table, Input, Tag, Button } from 'antd'
import uniq from 'lodash/uniqBy'
import ApplyCourse from './apply'

const sorter = (key) => (a, b) => String(a[key]).localeCompare(String(b[key]))

export default class MyCourse extends React.Component {
  state = {
    filteredInfo: {},
    categories: [],
    teachers: []
  }
  getCategories = (nextProps) => {
    const { dataSource = [] } = nextProps ? nextProps : this.props
    return uniq(dataSource.map(o => {
      return {
        text: o.courseCategoryName,
        value: o.courseCategoryName
      }
    }), 'value')
  }
  getTeachers = (nextProps) => {
    const { dataSource = [] } = nextProps ? nextProps : this.props
    return uniq(dataSource.map(o => {
      return {
        text: o.courseTeacher,
        value: o.courseTeacher
      }
    }), 'value')
  }
  handleFilterCategory = (val, record) => {
    return record.courseCategoryName === val
  }
  handleFilterTeacher = (val, record) => {
    return record.courseTeacher === val
  }
  handleChange = (...args) => {
    this.setState({
      filteredInfo: args[1]
    })
  }
  handleClearFilters = () => {
    this.setState({
      filteredInfo: {}
    })
  }
  componentDidMount() {
    if (this.props.dataSource) {
      this.setState({
        categories: this.getCategories(),
        teachers: this.getTeachers()
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource) {
      this.categories = this.getCategories(nextProps)
      this.teachers = this.getTeachers(nextProps)
    }
  }
  render() {
    const { filteredInfo } = this.state
    return <div>
      <div>
        <Input.Search
          style={{ marginBottom: 20, width: 280 }}
          placeholder="搜索：请输入课程名"
          onSearch={this.props.onSearch}
          enterButton
          allowClear
        />
        <Button onClick={this.handleClearFilters} style={{ marginLeft: 16 }}>清除表格过滤条件</Button>
      </div>
      <Table
        onChange={this.handleChange}
        locale={{ filterConfirm: '确定', filterReset: '清除' }}
        bordered
        pagination
        scroll={{ x: 'max-content' }} size="small" className="auto" dataSource={this.props.dataSource}>
        <Table.Column width={240} sorter={sorter('courseName')} title="课程名称" dataIndex="courseName" render={v => {
          return <div title={v}>{v}</div>
        }} />
        <Table.Column width={160} filteredValue={filteredInfo.courseCategoryName || null} onFilter={this.handleFilterCategory} filters={this.state.categories} sorter={sorter('courseCategoryName')} title="课程类型" dataIndex="courseCategoryName" />
        <Table.Column width={120} filteredValue={filteredInfo.courseTeacher || null} onFilter={this.handleFilterTeacher} filters={this.state.teachers} sorter={sorter('courseTeacher')} title="讲师" dataIndex="courseTeacher" />
        <Table.Column sorter={sorter('coursePeriod')} width={100} title="学时" dataIndex="coursePeriod" render={v => v && <Tag color="blue">{v + ' 小时'}</Tag>} />
        <Table.Column sorter={sorter('courseCredit')} width={100} title="学分" dataIndex="courseCredit" render={v => v && <Tag color="blue">{v + ' 分'}</Tag>} />
        <Table.Column sorter={sorter('courseIntroduce')} width={240} title="课程介绍" dataIndex="courseIntroduce" render={v => {
          return <div title={v}>{v}</div>
        }} />
        <Table.Column sorter={sorter('userCourseLearnStatus')} width={120} title="学习状态" dataIndex="userCourseLearnStatus" render={v => {
          return v && <Tag color="blue">{v}</Tag>
        }} />
        <Table.Column sorter={sorter('userCourseAuditStatus')} width={120} title="申请状态" dataIndex="userCourseAuditStatus" render={v => {
          return v && <Tag color="blue">{v}</Tag>
        }} />
        <Table.Column width={110} title="操作" dataIndex="courseId" render={(v, o) => {
          return <span style={{ fontSize: '13px' }}>
            <ApplyCourse onSuccess={this.handleSubscribeSuccess} disabled={o.userCourseLearnStatus} data={o}>
              <a>申请</a>
            </ApplyCourse>
            <span className="splitting">|</span>
            <CourseInfo id={v}>
              <a>详情</a>
            </CourseInfo>
          </span>
        }} />
      </Table>
    </div>
  }
}