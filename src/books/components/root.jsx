import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Tree, Input, Icon, AutoComplete } from 'antd'
import Book from './book'
import PageHeader from 'components/head'
import _ from 'lodash'

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
  traverseNodes = (nodes) => {
    return nodes.map(o => {
      const hasUrl = o.url !== void (0)
      if (o.bookList) {
        this.bookList = _.uniqBy(this.bookList.concat(o), 'bookTypeId')
        return <Tree.TreeNode origin={ o } title={ o.bookTypeName } url={ o.url } selectable={ hasUrl } isLeaf={ hasUrl } key={ o.bookTypeId } dataRef={ o }>
          {
            o.bookList.map(o => {
              return <Tree.TreeNode origin={ o } title={ o.bookName } url={ o.bookUrl } selectable={ true } isLeaf={ true } key={ o.id } dataRef={ o }></Tree.TreeNode>
            })
          }
        </Tree.TreeNode>
      }
      return <Tree.TreeNode origin={ o } title={ o.bookTypeName } url={ o.url } selectable={ hasUrl } isLeaf={ hasUrl } key={ o.bookTypeId } dataRef={ o }>
        {
          o.bookTypeList && this.traverseNodes(o.bookTypeList)
        }
      </Tree.TreeNode>
    })
  }
  handleSelect = obj => {
    let url = _.flattenDeep(this.bookList.map(o => o.bookList)).find(o => o.id === obj[0]).bookUrl.split('|')[1]
    this.setState({
      url: url,
      welcome: false,
      selectedKeys: obj
    })
  }
  handleSearchChange = obj => {
    const id = obj.split('|')[0]
    let parentId = this.bookList.find(o => o.bookList.some(o => o.id === id)).bookTypeId
    this.setState({
      url: obj.split('|')[1],
      welcome: false,
      selectedKeys: [id],
      expandedKeys: [parentId]
    })
  }
  handleSearch = value => {
    this.bookList
  }
  handleAutoComplete = () => {
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
    })
    this.setState({
      bookList: p.map(group => (
        <OptGroup key={ group.bookTypeId } label={ <b>{ group.title }</b> }>
          { group.children.map((opt, i) => (
            <Option key={ opt.key } value={ opt.key + opt.url }>
              { opt.title }
            </Option>
          )) }
        </OptGroup>
      ))
    })
  }
  handleExpand = (keys) => {
    this.setState({
      expandedKeys: keys
    })
  }
  render() {
    const { bookTypes } = this.props
    return <Layout current="books" fullScreen>
      <PageHeader backIcon={ <Icon type="book" style={ { fontSize: 16, color: 'rgba(0,0,0,.65)' } } /> } onBack={ () => null } title="电子丛书" subTitle={ <Input.Search className="input-search" style={ { width: 260 } } placeholder="搜索文档" onChange={ this.onChange } /> } />
      <div className="flex books-context">
        <div style={ { display: 'block' } } className="left-tree">
          <Tree.DirectoryTree
            selectedKeys={ this.state.selectedKeys }
            onExpand={ this.handleExpand }
            autoExpandParent
            defaultExpandAll={ true }
            showLine
            onSelect={ this.handleSelect }
            expandedKeys={ this.state.expandedKeys }
          >
            {
              this.state.traverseNodes
            }
          </Tree.DirectoryTree>
        </div>
        {
          this.state.welcome ? <div className="welcome flex center">
            <AutoComplete
              size="large"
              onSelect={ this.handleSearchChange }
              style={ { width: '40%', marginBottom: '30%' } }
              onFocus={ this.handleAutoComplete } dataSource={ this.state.bookList }>
              <Input.Search
                placeholder="搜索技术文档"
                size="large"
                onSearch={ this.handleSearch }
              />
            </AutoComplete>
          </div> : <div className="auto document-context">
              <Book url={ this.state.url } />
            </div>
        }
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)