import React, { Component } from 'react'
import { AutoComplete, Input } from 'antd'

export default class Search extends Component {
  render() {
    const { size, onSelect = e => e, style, onFocus = e => e, dataSource, placeholder, onSearch = e => e, onInput = e => e } = this.props
    return <AutoComplete
      size={size}
      onSelect={onSelect}
      style={style}
      onFocus={onFocus} dataSource={dataSource}>
      <Input.Search
        placeholder={placeholder}
        onSearch={onSearch}
        size={size}
        onInput={onInput}
      />
    </AutoComplete>
  }
}