import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Layout from 'components/layout'
import { Table, Card, Statistic, Progress, Spin } from 'antd'
import moment from 'moment'
import Operator from '../../components/operator'

import './style.scss'

const breadcrumb = [
  {
    text: '在线考试'
  }
]

const isCompleted = status => {
  return [2, 3, 4, -3].indexOf(Number(status)) > -1
}

const status = {
  '0': "未完成",
  '2': "未批改",
  '3': "通过",
  '4': '未通过',
  '-3': '考试超时',
  '-4': '正在考试'
}

function round(v) {
  return v && Math.round(v * 100) / 100
}

class Root extends Component {
  state = {
    loading: true,
    pageNum: 1
  }
  componentDidMount() {
    this.fetchData()
    window.addEventListener('storage', () => {
      this.fetchData()
    })
  }
  fetchData = () => {
    this.props.dispatch(actions.fetchExamList({
      pageNum: this.state.pageNum,
      pageSize: 1000
    })).then(() => {
      this.setState({
        loading: false
      })
    })
  }
  render() {
    const { records, percent, passed, failed, completed, total } = this.props
    const { list } = records
    const length = list.length || 1
    const { loading } = this.state
    const loadingElem = <div style={{ padding: 60, textAlign: 'center' }}>
      <Spin />
    </div>
    return <Layout breadcrumb={breadcrumb} current="exam">
      <div className="flex cards">
        <Card>
          <Statistic title={<span>整体进度</span>} value={round(percent) + '%'} />
          <Progress percent={percent} showInfo={false} />
        </Card>
        <Card>
          <Statistic title={<span>已完成考试数量</span>} value={completed} />
          <Progress percent={completed / length * 100} showInfo={false} />
        </Card>
        <Card>
          <Statistic title={<span>已通过数量</span>} value={passed} />
          <Progress status="success" percent={passed / length * 100} showInfo={false} />
        </Card>
        <Card>
          <Statistic title={<span>未通过数量</span>} value={failed} />
          <Progress status="exception" percent={failed / length * 100} showInfo={false} />
        </Card>
      </div>
      <Card title="考试信息" style={{ marginTop: 20 }}>
        {
          loading ? loadingElem : <Table pagination scroll={{ x: 'max-content' }} dataSource={list}>
            <Table.Column title="待考试卷" dataIndex="examinationName" width={280} />
            <Table.Column title="考试类型" dataIndex="examinationType" width={140} />
            <Table.Column title="进度 / 完成状态" dataIndex="process" width={250} render={(text, record) => {
              let status = 'active'
              if (record.userExaminationPass || record.userExaminationStatus) {
                status = record.userExaminationPass === '否' ? 'exception' : record.userExaminationPass === '是' ? '' : 'normal'
              }
              return <Progress status={status} percent={isCompleted(record.userExaminationStatus) ? 100 : Math.round(text * 10000) / 100}></Progress>
            }} />
            <Table.Column title="注册日期" dataIndex="examinationStarttime" width={150} render={(text) => {
              return moment(text).format('YYYY-MM-DD')
            }} />
            <Table.Column title="考试截至日期" dataIndex="examinationEndtime" width={150} render={(text) => {
              return moment(text).format('YYYY-MM-DD')
            }} />
            <Table.Column title="时长" dataIndex="examinationLong" width={150} render={(text) => {
              return text && (text + ' 分钟')
            }} />
            <Table.Column title="阅卷信息" dataIndex="userExaminationStatus" width={120} render={(v, r) => {
              return status[v] || r.userExaminationMarkStatus
            }} />
            <Table.Column title="考试分数" dataIndex="userExaminationScore" align="center" width={120} />
            <Table.Column fixed="right" title="操作" width={120} dataIndex="examinationId" render={(text, record) => {
              if (isCompleted(record.userExaminationStatus)) {
                return <Operator>
                  <Operator.Item><a target="_blank" href={`/exam/result?id=${record.examinationId}`}>查看阅卷信息</a></Operator.Item>
                </Operator>
              } else {
                return <a target="_blank" href={`/exam/test?id=${text}`}>{record.process ? '继续考试' : '开始考试'}</a>
              }
            }} />
          </Table>
        }
      </Card>
    </Layout>
  }
}

export default connect(state => state)(Root)