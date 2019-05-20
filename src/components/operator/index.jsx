import React, { Component } from 'react'
import './style.scss'

class Item extends Component {
  render() {
    let { onClick = e => e, children } = this.props
    return <span onClick={ onClick }>{ children}</span>
  }
}

export default class Operator extends Component {
  static Item = Item
  render() {
    return <div className="operator-context">
      {this.props.children}
    </div>
  }
}