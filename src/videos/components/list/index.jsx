import React from 'react'
import { Progress } from 'antd'

import './style.scss'

export default class List extends React.Component {
  render() {
    const { children } = this.props
    return <ul className="mv-list">
      {children}
    </ul>
  }
}

class Item extends React.Component {
  render() {
    const { href, pictureSrc, title, category, teacher, intro, lastTime, progress } = this.props
    return <li className="mv-item">
      <a href={href} className="flex">
        <div className="mv-img" style={{ backgroundImage: `url(${pictureSrc})` }} />
        <div className="auto mv-context" style={{ marginLeft: 20 }}>
          <h1 className="ellipsis" style={{ fontSize: 24, lineHeight: 1.4, marginBottom: 4 }}>{title}</h1>
          <h4>{teacher ? <span style={{ marginRight: 8 }}>{teacher}</span> : ''}{category}</h4>
          <div style={{ color: 'grey', marginTop: 8 }}>{intro}</div>
          <div className="mv-footer">
            <time style={{ color: 'lightgrey' }}>{lastTime && moment(lastTime).fromNow()}</time>
            <Progress strokeLinecap="square" percent={Math.round(progress)} />
          </div>
        </div>
      </a>
    </li>
  }
}

List.Item = Item