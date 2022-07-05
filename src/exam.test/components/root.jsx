import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { QuestionCollection } from './question'
import Timer from './timer'
import AnswerSheet from './answerSheet'
import { Button, Modal, Spin, Icon, Result, message } from 'antd'
import querystring from 'query-string'

import './style.scss'

const { id } = querystring.parse(location.search)

class Root extends Component {
  state = {
    selectedIndex: 0,
    ended: false,
    isLoading: false
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.props.dispatch(actions.fetchExamInfo(id)).then(res => {
      this.setState({
        isLoading: false,
        ended: res.code === -13
      })
    })
    window.addEventListener('beforeunload', e => {
      if (!this.state.ended) {
        e.returnValue = '是否继续退出考试'
        setTimeout(() => {
          this.logout()
        })
      }
    })
    window.addEventListener('unload', this.logout)
  }
  logout = () => {
    const { records } = this.props
    navigator.sendBeacon('/api/exam/stop?' + querystring.stringify({
      token: window.token,
      userExamId: records.userExamId,
      remaintime: this.timer.value / 1000 / 60
    }))
  }
  handleUpdate = (dataSource) => {
    this.props.dispatch(actions.updateExamInfo(dataSource))
  }
  handleChangeIndex = index => {
    this.setState({
      selectedIndex: index
    })
  }
  handleFinish = () => {
    actions.endExam({
      userExamId: this.props.records.userExamId
    }).then(res => {
      if (res.code === 0) {
        localStorage.setItem('exam_ended', true)
        this.setState({
          ended: true
        })
      } else {
        message.warn('服务异常')
      }
    })
  }
  handleCheckout = () => {
    const { list } = this.props.records
    if (list.some(o => !o.answered)) {
      message.info('当前有未完成的试题，不允许交卷哦')
      return
    }
    Modal.confirm({
      okText: "交卷",
      cancelText: '取消',
      title: '交卷',
      content: '已完成所有试题，是否确定继续交卷',
      onOk: () => {
        this.handleFinish()
      }
    })
  }
  handleLeave = () => {
    localStorage.removeItem('exam_ended')
    window.close()
  }
  render() {
    let { list = [], examLong, examRemain } = this.props.records
    const { selectedIndex, ended, isLoading } = this.state
    examRemain = Number.isNaN(examRemain * 1) ? 0 : Number(examRemain)
    if (ended) {
      return <div style={{ padding: 50 }}>
        <Result
          icon={<Icon type="smile" theme="twoTone" />}
          status="success"
          title="考试已结束"
          extra={[
            <Button onClick={this.handleLeave} type="primary" key="console">
              离开
          </Button>]}
        />
      </div>
    }
    if (isLoading) {
      return <div style={{ padding: '64px', textAlign: 'center' }}>
        <Spin tip="试题加载中" />
      </div>
    }
    return <div className="exam-test">
      <QuestionCollection current={selectedIndex} onUpdateIndex={this.handleChangeIndex} onChange={this.handleUpdate} dataSource={list}></QuestionCollection>
      <div className="time-count" style={{ visibility: list.length > 0 ? 'visible' : 'hidden' }}>
        <AnswerSheet onEmit={this.handleChangeIndex} title="答题卡" dataSource={list} />
        <Button size="large" block style={{ marginTop: 20, lineHeight: 1 }} onClick={this.handleCheckout}>交卷</Button>
        <div style={{ textAlign: 'center', margin: '20px auto' }}>
          {
            (examRemain || examLong) ? <Timer onFinish={this.handleFinish} ref={ref => {
              if (ref) this.timer = ref
            }} value={(examRemain || examLong) * 60000} /> : ''
          }
        </div>
      </div>
    </div>
  }
}

export default connect(state => state)(Root)