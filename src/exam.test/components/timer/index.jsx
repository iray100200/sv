import React, { Component } from 'react'
import { Statistic } from 'antd'

export default class Timer extends Component {
  render() {
    const { style } = this.props
    return <div className="timer" style={ style }>
      <Statistic.Countdown title="剩余时间" format='HH:mm:ss' value={ Date.now() + 1000000 } />
    </div>
  }
}