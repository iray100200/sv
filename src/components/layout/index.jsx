import { Layout, Menu, Icon, Breadcrumb, BackTop, Input, Popover, message, Drawer, Avatar } from 'antd'
import React from 'react'
import './style.scss'
import menuConfig from '../../../menu.json'
import querystring from 'query-string'
import exceed from 'utils/apimap'

function fetchUserInfo() {
  return new Promise((resolve) => {
    exceed.fetch({
      api: 'fetchUserInfo'
    }).then(res => {
      resolve(res)
    }).fail(() => {
      message.warn('网络异常')
    })
  })
}

message.config({
  top: 120,
  getContainer: () => document.getElementById('root')
})
window.message = message
window.query = querystring.parse(location.search)

window.userInfo = {
  role: 0
}

export default class _Layout extends React.Component {
  state = {
    current: 1,
    visible: false
  }
  constructor(props) {
    super(props)
    window.loadUserInfo = fetchUserInfo().then(data => {
      if (data.code === 0) {
        window.userInfo = data.body
        this.head = userInfo.photo || '/assets/head.jpg'
        this.setState({
          userInfo: data.body
        })
      } else {
        location.href = '/login'
      }
    })
    this.state = {
      userInfo: {}
    }
  }
  handleClick = v => {

  }
  handleShowUserInfo = () => {
    this.setState({
      visible: true
    })
  }
  handleClose = () => {
    this.setState({
      visible: false
    })
  }
  handleLogout = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
    location.href = '/login'
    document.cookie = `token=; expires=${new Date(0)}`
  }
  render() {
    const { userInfo } = this.state
    if (!window.token) return null
    let { fullScreen = false, breadcrumb = [{
      text: '首页'
    }], showSearch, current, backTopTarget } = this.props
    return (
      <Layout className="flex vertical">
        <Layout.Header>
          <div className="logo"><img width="120" src={"/assets/logo.jpg"} /></div>
          <Menu
            selectedKeys={[current]}
            className="page-menu"
            onClick={this.handleClick}
            mode="horizontal"
            theme="dark"
          >
            {
              menuConfig.map(o => {
                return <Menu.Item key={o.key}>
                  <a href={o.href}>
                    <Icon type={o.icon} />
                    {o.title}
                  </a>
                </Menu.Item>
              })
            }
          </Menu>
          <div className="user flex middle right" onClick={this.handleShowUserInfo}>
            <Avatar src={this.head} />
          </div>
        </Layout.Header>
        <Layout.Content>
          <BackTop target={() => backTopTarget || document.querySelector('.ant-layout-content')} />
          <div className={`layout-context${fullScreen ? ' full-screen' : ''}`}>
            {
              !fullScreen ? <Breadcrumb>
                {
                  breadcrumb.map((o, i) => {
                    return <Breadcrumb.Item key={String(i)}><a href={o.link}>{o.text}</a></Breadcrumb.Item>
                  })
                }
                {
                  showSearch ? <Breadcrumb.Item>
                    <Popover placement="right" content={<Input.Search
                      placeholder="请输入"
                      onSearch={value => console.log(value)}
                      style={{ width: 200 }}
                    />}>
                      <Icon type="search" onClick={this.handleSearchButton} />
                    </Popover>
                  </Breadcrumb.Item> : ''
                }
              </Breadcrumb> : ''
            }
            <div style={{ marginTop: !fullScreen ? 16 : 0 }}>
              {this.props.children}
            </div>
          </div>
          <Drawer
            width="320"
            onClose={this.handleClose}
            visible={this.state.visible}
            closable={false}
            placement="right">
            <div class="drawer-head flex vertical center">
              <div className="user">
                <Avatar size={100} src={this.head} />
              </div>
              <h4>{userInfo.name} ({userInfo.officeName})</h4>
              <div className="flex center" style={{ marginTop: 20 }}>
                <a onClick={this.handleLogout}>注销</a>
              </div>
            </div>
          </Drawer>
        </Layout.Content>
      </Layout>
    )
  }
}