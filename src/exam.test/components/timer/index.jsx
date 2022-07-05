import React, { Component } from 'react'
import { Statistic } from 'antd'

export default class Timer extends Component {
  state = {
    now: Date.now()
  }
  componentDidMount() {
    this.value = this.props.value
    setInterval(() => {
      this.value -= 1000
    }, 1000)
  }
  handleFinish = () => {
    const { onFinish = e => e } = this.props
    onFinish()
  }
  render() {
    const { style, value } = this.props
    return <div className="timer" style={style}>
      <Statistic.Countdown onFinish={this.handleFinish} title="剩余时间" format='HH:mm:ss' value={this.state.now + value} />
    </div>
  }
}