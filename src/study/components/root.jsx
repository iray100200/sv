import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Layout from 'components/layout'
import { Card, Tabs, Table, Progress, Input } from 'antd'
import moment from 'moment'
import ApplyCourse from './apply'
import './style.scss'
import { courses, mycourses, allcourses } from '../mock'

const breadcrumb = [
  {
    text: '学习中心'
  }
]

class Root extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch(actions.fetchCourseCaegories())
    dispatch(actions.fetchUserCourses())
    dispatch(actions.fetchAllCourses())
    dispatch(actions.fetchLearningHistory())
  }
  viewDetail = obj => () => {

  }
  render() {
    const { allCourses } = this.props
    return <Layout current="study" breadcrumb={ breadcrumb }>
      <Card title="在线学习">
        <Tabs style={ { marginLeft: -12 } } type="line" tabPosition="left">
          <Tabs.TabPane tab={ <h4>我的课程</h4> } key="1">
            <span>
              <Input.Search
                style={ { marginBottom: 20, width: 280 } }
                placeholder="搜索：请输入课程名"
                onSearch={ value => console.log(value) }
                enterButton
              />
            </span>
            <Table size="small" pagination={ false } className="auto" dataSource={ courses }>
              <Table.Column key="0" width={ 400 } title="课程名称" dataIndex="name" />
              <Table.Column key="1" width={ 200 } title="截至日期" dataIndex="deadline" render={ (v) => {
                return moment(v).format('YYYY-MM-DD')
              } } />
              <Table.Column key="2" width={ 200 } title="进度" dataIndex="percent" render={ (v) => {
                return <Progress percent={ v * 100 } />
              } } />
              <Table.Column key="3" width={ 100 } align="right" render={ (v, record, index) => {
                return <a>开始学习</a>
              } } />
            </Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab={ <h4>选课中心</h4> } key="2">
            <span>
              <Input.Search
                style={ { marginBottom: 20, width: 280 } }
                placeholder="搜索：请输入课程名"
                onSearch={ value => console.log(value) }
                enterButton
              />
            </span>
            <Table scroll={ { x: 'max-content' } } size="small" dataSource={ allCourses.list }>
              <Table.Column key="0" width={ 140 } title="课程名称" dataIndex="courseName" render={ (v, o) => {
                return <a onClick={ this.viewDetail(o) }>{ v }</a>
              } } />
              <Table.Column key="2" width={ 140 } title="课程类型" dataIndex="courseCategoryName" />
              <Table.Column key="3" width={ 120 } title="讲师" dataIndex="courseTeacher" />
              <Table.Column key="4" width={ 100 } title="学时" dataIndex="coursePeriod" render={ v => v && v + ' 小时' } />
              <Table.Column key="5" width={ 100 } title="学分" dataIndex="courseCredit" render={ v => v && v + ' 分' } />
              <Table.Column key="6" width={ 220 } title="课程介绍" dataIndex="courseIntroduce" />
              <Table.Column key="6" width={ 120 } title="状态" dataIndex="userCourseLearnStatus" />
              <Table.Column key="7" width={ 80 } title="操作" dataIndex="seq" render={ v => {
                return <ApplyCourse>
                  <a>申请</a>
                </ApplyCourse>
              } } />
            </Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab={ <h4>学习档案</h4> } key="3">
            <span>
              <Input.Search
                style={ { marginBottom: 20, width: 280 } }
                placeholder="搜索：请输入课程名"
                onSearch={ value => console.log(value) }
                enterButton
              />
            </span>
            <Table size="small" pagination={ false } className="auto" dataSource={ mycourses }>
              <Table.Column width={ 400 } title="课程名称" dataIndex="name" />
              <Table.Column width={ 150 } title="课时" dataIndex="hours" render={ (v) => {
                return v + ' 小时'
              } } />
              <Table.Column width={ 150 } title="已学时间" dataIndex="hours" render={ (v, r, i) => {
                return Math.round(r.hours * r.percent * 100) / 100 + ' 小时'
              } } />
              <Table.Column width={ 200 } title="进度" dataIndex="percent" render={ (v) => {
                return <Progress percent={ v * 100 } />
              } } />
              <Table.Column width={ 100 } align="center" title="次数" dataIndex="times" />
              <Table.Column width={ 100 } title="操作" render={ (v) => {
                return <a>学习履历</a>
              } } />
            </Table>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Layout>
  }
}

export default connect(state => state)(Root)