import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Layout from 'components/layout'
import { Card, Tabs, Table, Progress, Input, Icon, Tag, Spin } from 'antd'
import moment from 'moment'
import PageHeader from 'components/head'
import MyCourse from './myCourse'
import CourseSelect from './courseSelect'

import './style.scss'

const breadcrumb = [
  {
    text: '学习中心'
  }
]

class Root extends Component {
  state = {
    loading1: true,
    loading2: true,
    loading3: true
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch(actions.fetchUserCourses()).then(() => {
      this.setState({
        loading1: false
      })
    })
    dispatch(actions.fetchAllCourses()).then(() => {
      this.setState({
        loading2: false
      })
    })
    dispatch(actions.fetchLearningHistory()).then(() => {
      this.setState({
        loading3: false
      })
    })
  }
  handleSearchMyCourse = (val) => {
    this.props.dispatch(actions.fetchUserCourses(val))
  }
  handleSearchHistory = (val) => {
    this.props.dispatch(actions.fetchLearningHistory(val))
  }
  handleSearchCourse = (val) => {
    this.props.dispatch(actions.fetchAllCourses(val))
  }
  handleSubscribeSuccess = () => {
    this.props.dispatch(actions.fetchAllCourses())
  }
  get tab3() {
    const { history } = this.props
    const sorter = (key) => (a, b) => String(a[key]).localeCompare(String(b[key]))
    return <div>
      <span>
        <Input.Search
          style={{ marginBottom: 20, width: 280 }}
          placeholder="搜索：请输入课程名"
          onSearch={this.handleSearchHistory}
          enterButton
          allowClear
        />
      </span>
      <Table bordered pagination scroll={{ x: 'max-content' }} size="small" dataSource={history.list}>
        <Table.Column sorter={sorter('backup01')} width={240} title="课程名称" dataIndex="backup01" />
        <Table.Column sorter={sorter('userCourseRecordStarttime')} width={150} title="学习开始时间" dataIndex="userCourseRecordStarttime" render={(v) => {
          return v && <Tag color="blue">{moment(v).format('YYYY-MM-DD HH:mm:ss')}</Tag>
        }} />
        <Table.Column sorter={sorter('userCourseRecordEndtime')} width={150} title="学习结束时间" dataIndex="userCourseRecordEndtime" render={(v) => {
          return v && <Tag color="blue">{moment(v).format('YYYY-MM-DD HH:mm:ss')}</Tag>
        }} />
        <Table.Column sorter={sorter('updateDate')} width={150} title="上次更新时间" dataIndex="updateDate" render={(v) => {
          return v && <Tag color="blue">{moment(v).format('YYYY-MM-DD HH:mm:ss')}</Tag>
        }} />
        <Table.Column sorter={sorter('userCourseRecordStatus')} width={120} dataIndex="userCourseRecordStatus" title="学习状态" render={v => {
          return v && <Tag color="blue">{v}</Tag>
        }} />
        <Table.Column sorter={sorter('userCourseRecordNumberProgress')} width={160} title="当前学习进度" dataIndex="userCourseRecordNumberProgress" render={(v) => {
          return <Progress percent={Math.round(Number(v) * 100)} />
        }} />
        <Table.Column sorter={sorter('userCourseRecordNumber')} width={100} align="center" title="已学次数" dataIndex="userCourseRecordNumber" render={v => {
          return v && <Tag color="blue">{v}</Tag>
        }} />
      </Table>
    </div>
  }
  render() {
    const loading = <div style={{ textAlign: "center" }}>
      <Spin tip="加载中">
        <Table size="small" />
      </Spin>
    </div>
    const { loading1, loading2, loading3 } = this.state
    const { allCourses, myCourses } = this.props
    return <Layout current="study" breadcrumb={breadcrumb} fullScreen>
      <PageHeader onBack={() => null} backIcon={<Icon type="home" style={{ fontSize: 16, color: 'rgba(0,0,0,.65)' }} />} title="学习中心" />
      <Card>
        <Tabs style={{ marginLeft: 0 }} type="line" tabPosition="left">
          <Tabs.TabPane tab={<h4>我的课程</h4>} key="1">
            {!loading1 ? <MyCourse dataSource={myCourses.list} onSearch={this.handleSearchMyCourse} /> : loading}
          </Tabs.TabPane>
          <Tabs.TabPane tab={<h4>选课中心</h4>} key="2">
            {!loading2 ? <CourseSelect dataSource={allCourses.list} onSearch={this.handleSearchCourse} /> : loading}
          </Tabs.TabPane>
          <Tabs.TabPane tab={<h4>学习档案</h4>} key="3">
            {!loading3 ? this.tab3 : loading}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Layout>
  }
}

export default connect(state => state)(Root)