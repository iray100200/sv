import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import moment from 'moment'

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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export default class ApplyCourse extends Component {
  state = {
    visible: false
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
    this.hideModal()
  }
  render() {
    const { children } = this.props
    return <span>
      <span onClick={ this.showModal }>{ children || '' }</span>
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
            <h4>北京邮政 存储部分</h4>
          </Form.Item>
          <Form.Item label="申请人">
            老王
          </Form.Item>
          <Form.Item label="申请时间">
            { moment(new Date()).format('YYYY-MM-DD') }
          </Form.Item>
          <Form.Item required label="申请原因">
            <Input.TextArea style={ { width: 400, marginTop: 8 } } />
          </Form.Item>
        </Form>
      </Modal>
    </span>
  }
}