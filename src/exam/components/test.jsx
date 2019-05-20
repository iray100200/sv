import React, { Component } from 'react'
import { Modal, Icon, Spin } from 'antd'

import './test.scss'

export default class Test extends Component {
  state = {
    visible: false,
    loaded: false
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    let { visible } = this.state
    let { children, target = {} } = this.props
    return <span>
      <span style={ { display: 'inline-block' } } onClick={ this.showModal }>{ children }</span>
      <Modal
        className="online-test"
        width={ screen.availWidth * 0.88 }
        height={ screen.availHeight * 0.84 }
        title={ <span className="flex bottom">
          <Icon type="cloud" style={ { marginRight: 8, fontSize: 22, position: 'relative', top: 1 } } />
          <label>在线考试</label>
          {/* <span className="sub-title">{ target.examinationName }</span> */}
        </span> }
        onCancel={ this.hideModal }
        footer={ false }
        maskClosable={ false }
        centered
        visible={ visible }>
        <div className="context" style={ { height: screen.availHeight * 0.7 } }>
          <Spin indicator={ <Icon type="loading" style={ { fontSize: 24 } } spin /> } spinning={ !this.state.loaded } tip={ <span>&nbsp;&nbsp;正在加载资源</span> }></Spin>
          <iframe ref={ ref => {
            if (ref) {
              ref.addEventListener('load', e => {
                this.setState({
                  loaded: true
                })
              })
            }
          } } frameBorder="0" src={ `/exam/test?id=${target.examinationId}` }></iframe>
        </div>
      </Modal>
    </span>
  }
}