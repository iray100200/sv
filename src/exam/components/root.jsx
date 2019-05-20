import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Layout from 'components/layout'
import { Table, Card, Statistic, Progress } from 'antd'
import moment from 'moment'
import Test from './test'

import './style.scss'

const breadcrumb = [
  {
    text: '在线考试'
  }
]

const data = [
  {
    title: '试卷A',
    percent: 0.25,
    date: '2018-9-12',
    deadline: '2019-1-1',
    hours: 0.5
  }, {
    title: '试卷B',
    percent: 0,
    date: '2018-10-12',
    deadline: '2019-2-1',
    hours: 0.5
  }, {
    title: '试卷C',
    percent: 0.5,
    date: '2018-10-12',
    deadline: '2019-2-1',
    hours: 0.5
  }
]

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchExamList({
      pageNum: 1,
      pageSize: 10
    }))
  }
  render() {
    const { records } = this.props
    const { list, pageNo, pageSize } = records
    return <Layout breadcrumb={ breadcrumb } current="exam">
      <div className="flex cards">
        <Card>
          <Statistic title="整体完成度" value={ '20%' } />
        </Card>
        <Card>
          <Statistic title={ <span>已完成数量&nbsp;(<a>查看</a>)</span> } value={ 5 } />
        </Card>
        <Card>
          <Statistic title={ <span>通过&nbsp;(<a>查看</a>)</span> } value={ 3 } />
        </Card>
        <Card>
          <Statistic title={ <span>未通过&nbsp;(<a>查看</a>)</span> } value={ 2 } />
        </Card>
        <Card>
          <Statistic title={ <span>缺考记录&nbsp;(<a>查看</a>)</span> } value={ 2 } />
        </Card>
      </div>
      <Card title="待考试卷列表" style={ { marginTop: 20 } }>
        <Table dataSource={ list } pagination={ false }>
          <Table.Column title="待考试卷" dataIndex="examinationName" width={ 280 } />
          <Table.Column title="考试类型" dataIndex="examinationType" width={ 140 } />
          <Table.Column title="进度" dataIndex="percent" width={ 250 } render={ (text, record, inedx) => {
            return <Progress percent={ Math.round(text * 10000) / 100 }></Progress>
          } } />
          <Table.Column title="注册日期" dataIndex="examinationStarttime" width={ 150 } render={ (text) => {
            return moment(text).format('YYYY-MM-DD')
          } } />
          <Table.Column title="考试截至日期" dataIndex="examinationEndtime" width={ 150 } render={ (text) => {
            return moment(text).format('YYYY-MM-DD')
          } } />
          <Table.Column title="时长" dataIndex="examinationLong" width={ 150 } render={ (text) => {
            return text && (text + ' 分钟')
          } } />
          <Table.Column title="操作" dataIndex="backup01" width={ 100 } render={ (text, record) => {
            return <Test target={ record }><a>开始</a></Test>
          } } />
        </Table>
      </Card>
    </Layout>
  }
}

export default connect(state => state)(Root)