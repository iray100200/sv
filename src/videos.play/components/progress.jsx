import React, { Component } from 'react'
import { Progress } from 'antd'

export default class _Progress extends Component {
  state = {
    percent: 0
  }
  componentDidMount() {
    this.setState({
      percent: this.props.value || 0
    })
  }
  componentWillReceiveProps() {
    this.setState({
      percent: nextProps.value || 0
    })
  }
  setPercent(value) {
    this.setState({
      percent: value
    })
  }
  render() {
    return <Progress strokeWidth={10} strokeColor={{
      '0%': '#108ee9',
      '100%': '#87d068',
    }} percent={Math.round(this.state.percent * 100)} status="active" />
  }
}