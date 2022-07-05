import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import moment from 'moment'
import * as actions from '../../actions'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}

export default class ApplyCourse extends Component {
  state = {
    visible: false,
    reason: ''
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  hideModal = () => {
    this.setState({
      visible: false,
    })
  }
  handleSubmit = () => {
    const { reason, onSuccess = e => e } = this.state
    if (reason.length < 1) {
      message.info('请填写申请原因')
      return
    }
    actions.subscribeCourse({
      courseId: this.props.data.courseId,
      userCourseReason: reason
    }).then(res => {
      if (res.code === 0) {
        message.success('订阅成功')
        onSuccess()
        this.hideModal()
        return 
      }
      message.success(res.message || '订阅失败')
      this.hideModal()
    })
  }
  handleChangeReason = (e) => {
    this.setState({
      reason: e.currentTarget.value
    })
  }
  render() {
    const { children, disabled, data } = this.props
    return <span>
      <span className={`${disabled ? 'disabled' : ''}`} onClick={ !disabled && this.showModal }>{ children || '' }</span>
      <Modal
        width={ 600 }
        centered
        title="申请课程"
        visible={ this.state.visible }
        onOk={ this.handleSubmit }
        okText="提交申请"
        cancelText="取消"
        onCancel={ this.hideModal }>
        <Form className="s8" { ...formItemLayout }>
          <Form.Item label="课程名称">
            <h4>{data.courseName}</h4>
          </Form.Item>
          <Form.Item label="申请人">
            {window.userInfo.name}
          </Form.Item>
          <Form.Item label="申请时间">
            { moment(new Date()).format('YYYY-MM-DD') }
          </Form.Item>
          <Form.Item required label="申请原因">
            <Input.TextArea value={this.state.reason} onChange={this.handleChangeReason} style={ { width: 400, marginTop: 8 } } />
          </Form.Item>
        </Form>
      </Modal>
    </span>
  }
}