import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Tree, Input, Icon, AutoComplete } from 'antd'
import Book from './book'
import PageHeader from 'components/head'
import _ from 'lodash'
import Search from 'components/search'

import './style.scss'

const Option = AutoComplete.Option
const OptGroup = AutoComplete.OptGroup

class Root extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    update: 0,
    url: '',
    welcome: true,
    bookList: [],
    expandedKeys: [],
    selectedKeys: [],
    traverseNodes: null
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchBooksAndTypes()).then(() => {
      let traverseNodes = this.traverseNodes(this.props.bookTypes)
      this.setState({
        traverseNodes
      })
    })
  }
  bookList = []
  searchKey = ''
  traverseNodes = (nodes) => {
    return nodes.map(o => {
      const hasUrl = o.url !== void (0)
      if (o.bookList) {
        this.bookList = _.uniqBy(this.bookList.concat(o), 'bookTypeId')
        return <Tree.TreeNode origin={o} title={o.bookTypeName} url={o.url} selectable={hasUrl} isLeaf={hasUrl} key={o.bookTypeId} dataRef={o}>
          {
            o.bookList.map(o => {
              return <Tree.TreeNode icon={<Icon type="link" />} origin={o} title={<a>{o.bookName}</a>} url={o.bookUrl} selectable={true} isLeaf={true} key={o.id} dataRef={o}></Tree.TreeNode>
            })
          }
        </Tree.TreeNode>
      }
      return <Tree.TreeNode origin={o} title={o.bookTypeName} selectable={false} key={o.bookTypeId} dataRef={o}>
        {
          o.bookTypeList && this.traverseNodes(o.bookTypeList)
        }
      </Tree.TreeNode>
    })
  }
  handleSelect = obj => {
    let url = _.flattenDeep(this.bookList.map(o => o.bookList)).find(o => o.id === obj[0]).bookUrl
    this.setState({
      url: url,
      welcome: false,
      selectedKeys: obj
    })
  }
  handleSearchChange = obj => {
    const id = obj
    let parentId = this.bookList.find(o => o.bookList.some(o => o.id === id)).bookTypeId
    let target = _.flatten(this.bookList.map(o => o.bookList)).find(o => o.id === id)
    this.setState({
      url: target && target.bookUrl,
      welcome: false,
      selectedKeys: [id],
      expandedKeys: [parentId]
    })
  }
  handleSearch = e => {
    let value = e.target.value
    this.searchKey = value
    this.setState({
      bookList: this.stateBookList
    })
  }
  handleAutoComplete = () => {
    this.searchKey = ''
    this.setState({
      bookList: this.stateBookList
    })
  }
  get stateBookList() {
    let { searchKey } = this
    let p = this.bookList.map(o => {
      return {
        title: o.bookTypeName,
        key: o.bookTypeId,
        children: o.bookList.map(o => {
          return {
            title: o.bookName,
            key: o.id,
            url: o.bookUrl
          }
        })
      }
    }).map(o => {
      o.children = o.children.filter(o => {
        return o.title.toLowerCase().indexOf(searchKey) > -1
      })
      return o
    }).filter(o => {
      return o.children.length > 0
    })
    return p.map(group => (
      <OptGroup key={group.key} label={<b>{group.title}</b>}>
        {group.children.map((opt, i) => (
          <Option key={opt.key} value={opt.key}>
            {opt.title}
          </Option>
        ))}
      </OptGroup>
    ))
  }
  handleExpand = (keys) => {
    this.setState({
      expandedKeys: keys
    })
  }
  render() {
    return <Layout current="books" fullScreen>
      <PageHeader backIcon={<Icon type="book" style={{ fontSize: 16, color: 'rgba(0,0,0,.65)' }} />} onBack={() => null} title="电子丛书" subTitle={(
        <Search
          onSelect={this.handleSearchChange}
          placeholder="搜索技术文档"
          onInput={this.handleSearch}
          className="input-search"
          onFocus={this.handleAutoComplete} dataSource={this.state.bookList}
          style={{ width: 280 }} />)} />
      <div className="flex books-context">
        <div style={{ display: 'block' }} className="left-tree">
          <Tree.DirectoryTree
            showIcon
            selectedKeys={this.state.selectedKeys}
            onExpand={this.handleExpand}
            autoExpandParent
            defaultExpandParent={true}
            defaultExpandAll={true}
            showLine
            onSelect={this.handleSelect}
            expandedKeys={this.state.expandedKeys}
          >
            {
              this.state.traverseNodes
            }
          </Tree.DirectoryTree>
        </div>
        {
          this.state.welcome ? <div className="welcome flex center">
            <Search size="large"
              onSelect={this.handleSearchChange}
              placeholder="搜索技术文档"
              onInput={this.handleSearch}
              onFocus={this.handleAutoComplete} dataSource={this.state.bookList}
              style={{ width: '40%', marginBottom: '30%' }} />
          </div> : <div className="auto document-context">
              <Book url={this.state.url} />
            </div>
        }
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)