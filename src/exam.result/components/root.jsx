import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Layout from 'components/layout'
import { Tag, Spin } from 'antd'
import moment from 'moment'
import Context from './context'

import './style.scss'

const breadcrumb = [
  {
    text: '在线考试'
  }, {
    text: '阅卷信息'
  }
]

function round(v) {
  return v && Math.round(v * 100) / 100
}

class Root extends Component {
  state = {
    selectedIndex: 0,
    isLoading: false
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.setState({
      isLoading: true
    })
    return this.props.dispatch(actions.fetchExamInfo(query.id)).then(() => {
      this.setState({
        isLoading: false
      })
    })
  }
  handleChangeIndex = index => () => {
    this.setState({
      selectedIndex: index
    })
  }
  render() {
    const { records } = this.props
    const { list = [] } = records
    const { selectedIndex, isLoading } = this.state
    return <Layout breadcrumb={breadcrumb} current="exam">
      {
        isLoading ? <div style={{ padding: '64px', textAlign: 'center' }}>
          <Spin tip="阅卷信息加载中" />
        </div> : <Context onIndexChange={index => {
          this.handleChangeIndex(index)()
        }} dataSource={list} current={selectedIndex} title={<span className="flex middle">
          <label>{records.examName}</label>
          <label style={{ marginLeft: 20 }} color="red">{records.wrongCount}个错题</label>
        </span>}>
            {
              list.map((o, i) => {
                return <Context.Item onClick={this.handleChangeIndex(i)} selected={selectedIndex + 1 === o.index} dataSource={o} />
              })
            }
          </Context>
      }
    </Layout>
  }
}

export default connect(state => state)(Root)