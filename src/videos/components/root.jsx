import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import PictureCard from 'components/pictureCard'
import { Input, Icon, Button, Dropdown, Menu, Empty } from 'antd'
import PageHeader from 'components/head'
import List from './list'
import _ from 'lodash'

import './style.scss'

const statusBtns = [{
  text: '全部档案',
  value: ''
}, {
  text: '学习中',
  value: '学习中'
}, {
  text: '未学习',
  value: '未学习'
}]

class Root extends Component {
  selectedFilter = '1'
  state = {
    layout: localStorage.getItem('layout') || 'block',
    types: [],
    categoryBy: '',
    statusBy: '',
    hasMoreCategory: false
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchVideos()).then(() => {
      const { videos } = this.props
      const count = Object.entries(_.countBy(videos.map(o => o.courseCategoryName))).sort((a, b) => b[1] - a[1])
      const types = count.map(o => o[0])
      this.setState({
        types,
        hasMoreCategory: count.length > 8
      })
    })
  }
  transformUrl(url) {
    return url
  }
  handleSearch = (key) => {
    const { statusBy, categoryBy } = this.state
    this.props.dispatch(actions.fetchVideos({
      courseName: this.key = key
    }, {
        statusBy, categoryBy
      }))
  }
  handleLayout = layout => () => {
    localStorage.setItem('layout', layout)
    this.setState({
      layout
    })
  }
  showByStatus = statusBy => () => {
    this.setState({
      statusBy
    }, this.handleSearch)
  }
  showAll = () => {
    this.setState({
      categoryBy: ''
    }, this.handleSearch)
  }
  showByCategory = categoryBy => () => {
    this.setState({
      categoryBy
    }, this.handleSearch)
  }
  handleCategoryClick = target => {
    this.showByCategory(target.key)()
  }
  get indicateMore() {
    const { categoryBy, types } = this.state
    return categoryBy && types.slice(0, 6).indexOf(categoryBy) < 0
  }
  renderList = () => {
    const { videos } = this.props
    return videos.length > 0 ? <List>
      {
        videos.map(o => <List.Item
          href={`/videos/play?id=${o.userCourseId}`}
          pictureSrc={this.transformUrl(o.coursePic || o.courseVideo)}
          title={o.courseName}
          category={o.courseCategoryName}
          teacher={o.courseTeacher}
          intro={o.courseIntroduce}
          lastTime={o.updateUserCourseDate}
          progress={(o.userCourseRecordNumberProgress || 0) * 100} />)
      }
    </List> : <Empty style={{ marginTop: 56 }} />
  }
  render() {
    const { layout, types, categoryBy, statusBy, hasMoreCategory } = this.state
    const { videos } = this.props
    const menus = (
      <Menu selectedKeys={[categoryBy]} onClick={this.handleCategoryClick}>
        {
          types.slice(6).map(o => {
            return <Menu.Item key={o}>{o}</Menu.Item>
          })
        }
      </Menu>
    )
    return <Layout current="videos" fullScreen>
      <PageHeader backIcon={<Icon type="play-circle" style={{ fontSize: 16, color: 'rgba(0,0,0,.65)' }} />} onBack={() => null} title="在线视频"
        subTitle={<Input.Search className="input-search" style={{ width: 260 }} placeholder="搜索视频" onSearch={this.handleSearch} />} />
      <div className="context">
        <div>
          <Button.Group style={{ marginBottom: 20 }}>
            <Button type={layout === 'block' ? 'primary' : ''} onClick={this.handleLayout('block')}><Icon type="appstore" /></Button>
            <Button type={layout === 'list' ? 'primary' : ''} onClick={this.handleLayout('list')}><Icon type="bars" /></Button>
          </Button.Group>
          <Button.Group style={{ marginLeft: 20 }}>
            {
              statusBtns.map((o, i) => {
                return <Button type={statusBy === o.value ? 'primary' : 'normal'} onClick={this.showByStatus(o.value)} key={String(i)}>{o.text}</Button>
              })
            }
          </Button.Group>
          <Button.Group style={{ marginLeft: 20 }}>
            <Button key={0} type={categoryBy === '' ? 'primary' : 'normal'} onClick={this.showAll}>全部类型</Button>
            {
              types.slice(0, 6).map((o, i) => {
                return <Button key={String(i + 1)} type={categoryBy === o ? 'primary' : 'normal'} onClick={this.showByCategory(o)}>{o}</Button>
              })
            }
            {
              hasMoreCategory ? <Dropdown overlay={menus}>
                <Button type={this.indicateMore ? 'primary' : ''}>
                  其他类型
                </Button>
              </Dropdown> : ''
            }
          </Button.Group>
        </div>
        {
          layout === 'block' ? <PictureCard.Container>
            {
              videos.map(o => {
                return <PictureCard picture={this.transformUrl(o.coursePic || o.courseVideo)} title={o.courseName} subTitle={o.courseHoure} href={`/videos/play?id=${o.userCourseId}`} />
              })
            }
          </PictureCard.Container> :
            this.renderList()
        }

      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)