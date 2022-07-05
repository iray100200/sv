import React, { Component } from 'react'
import { Icon } from 'antd'

import './style.scss'

class Item extends Component {
  render() {
    const { label, children, type } = this.props
    return <div className={`info-item`}>
      {
        label ? <label>{label}</label> : ''
      }
      <span>{children}</span>
    </div>
  }
}

export default class Info extends Component {
  static Item = Item
  render() {
    const { style, className = '', children, title, subTitle, type, hasBorder, theme = 'light' } = this.props
    const _class = `info-context${type === 'across' ? ' across' : ''} ${hasBorder ? 'has-border' : ''} ${theme} ${className}`
    return <div style={style} className={_class}>
      <h2>{title}</h2>
      {
        subTitle ? <h4>{subTitle}</h4> : ''
      }
      <div className="container">{children}</div>
    </div>
  }
}