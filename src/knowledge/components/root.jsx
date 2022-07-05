import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Tree, BackTop, Input, Icon, AutoComplete } from 'antd'
import PageHeader from 'components/head'
import exceed from 'utils/apimap'
import Search from 'components/search'
import Book from '../../books/components/book'
import _ from 'lodash'

import './style.scss'

const breadcrumb = [
  {
    text: '电子丛书'
  }
]

const OptGroup = AutoComplete.OptGroup
const Option = AutoComplete.Option

const fetchKnowledgeByTypeId = data => new Promise((resolve) => {
  exceed.fetch({
    api: 'fetchKnowledgeByTypeId',
    data
  }).then(res => {
    if (res.code === 0) {
      resolve(res.body)
    }
  })
})

class Root extends Component {
  state = {
    typeNodes: [],
    selectedId: '',
    welcome: true,
    expandedKeys: [],
    detail: {}
  }
  searchKey = ''
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.fetchKnowledgeTypes()).then(o => {
      let { typeList } = this.props
      this.setState({
        typeNodes: this.traverseTypeNodes(typeList)
      })
    })
  }
  bookList = []
  traverseTypeNodes = (nodes) => {
    if (!nodes) return null
    return nodes.map(o => {
      if (o.knowledgeList) {
        this.bookList = this.bookList.concat(o.knowledgeList)
      }
      return <Tree.TreeNode selectable={false} title={o.knowledgeTypeName} key={o.knowledgeTypeId}>
        {o.retKnowledgeTypes && this.traverseTypeNodes(o.retKnowledgeTypes)}
        {o.knowledgeList && this.traverseNodes(o.knowledgeList)}
      </Tree.TreeNode>
    })
  }
  traverseNodes = (nodes) => {
    if (!nodes) return null
    return nodes.map(o => {
      this.bookList = _.uniqBy(this.bookList.concat(o), 'id')
      return <Tree.TreeNode icon={<Icon type="link" />} title={<a>{o.knowledgeName}</a>} key={o.id} isLeaf />
    })
  }
  handleAutoComplete = () => {
    this.setState({
      bookList: this.stateBookList
    })
  }
  get stateBookList() {
    let { searchKey } = this
    searchKey = searchKey.toLowerCase()
    let p = this.bookList.filter(o => {
      return o.knowledgeName.toLowerCase().indexOf(searchKey) > -1 || (() => {
        const ele = document.createElement('div')
        ele.innerHTML = o.knowledgeContent
        return ele.textContent.toLowerCase().indexOf(searchKey) > -1
      })()
    }).map(o => {
      return {
        parent: o.knowledgeTypeName,
        title: o.knowledgeName,
        key: o.id
      }
    })
    let groups = _.groupBy(p, 'title')
    p = Object.keys(groups).map((o, i) => {
      return {
        title: o,
        key: String(i),
        children: groups[o]
      }
    }).slice(0, 10)
    return p.map(group => (
      <OptGroup key={group.key} label={<label className="grey">{group.title.toUpperCase()}</label>}>
        {group.children.map((opt, i) => (
          <Option key={opt.key} value={opt.key}>
            {opt.title.toUpperCase()}
          </Option>
        ))}
      </OptGroup>
    ))
  }
  queryContent = id => () => {
    exceed.fetch({
      api: 'fetchKnowledge',
      data: {
        knowledgeId: id
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          detail: res.body
        })
      }
    })
  }
  handleSearchChange = id => {
    let obj = this.bookList.find(o => o.id === id)
    this.searchKey = ''
    this.selectedKeys = [id]
    if (obj) {
      this.setState({
        selectedId: obj && obj.id,
        expandedKeys: this.selectedKeys,
        welcome: false
      }, this.queryContent(id))
    }
  }
  handleSelect = (selectedKeys) => {
    let obj = this.bookList.find(o => o.id === selectedKeys[0])
    this.selectedKeys = selectedKeys
    this.setState({
      selectedId: obj && obj.id,
      welcome: false
    }, () => {
      if (obj) {
        this.queryContent(selectedKeys[0])()
      } else {
        this.setState({
          welcome: true,
          detail: {}
        })
      }
    })
  }
  handleSearch = e => {
    let value = e.target.value
    this.searchKey = value
    this.setState({
      bookList: this.stateBookList
    })
  }
  handleExpand = (keys) => {
    this.setState({
      expandedKeys: keys
    })
  }
  render() {
    const { expandedKeys, detail } = this.state
    return <Layout current="knowledge" fullScreen breadcrumb={breadcrumb}>
      <PageHeader backIcon={<Icon type="read" style={{ fontSize: 16, color: 'rgba(0,0,0,.65)' }} />} onBack={() => null} title="知识库" subTitle={<Search
        onSelect={this.handleSearchChange}
        placeholder="搜索技术文档"
        onInput={this.handleSearch}
        className="input-search"
        onFocus={this.handleAutoComplete} dataSource={this.state.bookList}
        style={{ width: 280 }} />} />
      <div className="flex books-context">
        <div style={{ display: 'block' }} className="left-tree">
          <Tree.DirectoryTree
            showIcon
            defaultExpandAll
            showLine
            onExpand={this.handleExpand}
            autoExpandParent
            selectedKeys={this.selectedKeys}
            expandedKeys={expandedKeys}
            onSelect={this.handleSelect}
          >
            <Tree.TreeNode title={'知识库'} key="0">
              {
                this.state.typeNodes
              }
            </Tree.TreeNode>
          </Tree.DirectoryTree>
        </div>
        <BackTop target={() => document.querySelector('.md')} />
        <div className="md">
          {
            this.state.welcome ? <div className="welcome flex center">
              <Search size="large"
                onSelect={this.handleSearchChange}
                placeholder="搜索技术文档"
                onInput={this.handleSearch}
                onFocus={this.handleAutoComplete} dataSource={this.state.bookList}
                style={{ width: '40%', marginBottom: '30%' }} />
            </div> : <div className="auto document-context">
                <Book url={detail.knowledgeBackup02} />
              </div>
          }
        </div>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)