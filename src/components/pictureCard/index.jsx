import React, { Component } from 'react'

import './style.scss'

class PictureCardContainer extends Component {
  state = {
    length: 4
  }
  componentDidMount() {
    this.setLength()
    window.addEventListener('resize', () => {
      this.setLength()
    })
  }
  setLength = () => {
    let offsetWidth = this.element.offsetWidth
    let max = 260
    let length = Math.floor(offsetWidth / max)
    this.setState({
      length
    })
  }
  render() {
    let { children, dir = 'hoz' } = this.props
    let len = this.state.length - ((children.length || 1) % this.state.length)
    let mess = (children.length % this.state.length) !== 0
    return <div ref={ref => this.element = ref} className={`picture-cards-container ${dir}`}>
      {children}
      {
        mess && <div style={{ flex: len, paddingLeft: len * 12 }}></div>
      }
    </div>
  }
}

export default class PictureCard extends Component {
  static Container = PictureCardContainer
  handleClick = () => {
    if (this.props.href)
      window.location.href = this.props.href
  }
  render() {
    let { picture, title, subTitle, width, dir = "hoz", style, className = '' } = this.props
    let minWidth = dir === 'ver' ? 0 : ''
    return <div title={title} className={`picture-card ${dir} ${className}`} style={style} onClick={this.handleClick}>
      <div className="picture" style={{ backgroundImage: `url(${picture})`, width, minWidth }}></div>
      <div className={`flex content ${dir === 'hoz' ? 'center' : 'vertical top'}`}>
        <h4 className={`${dir === 'hoz' ? 'auto' : ''}`}>{title}</h4>
        <label>{subTitle}</label>
      </div>
    </div>
  }
}