import { Layout, Menu, Icon, Breadcrumb, BackTop, Input, Popover, message } from 'antd'
import React from 'react'
import './style.scss'
import menuConfig from '../../../menu.json'
import querystring from 'query-string'

window.message = message
window.query = querystring.parse(location.search)

if (!sessionStorage.getItem('token')) {
  function getCookie(name) {
    var cookies = document.cookie;
    var list = cookies.split("; ")
    for (var i = 0; i < list.length; i++) {
      var arr = list[i].split("=")
      if (arr[0] == name)
        return decodeURIComponent(arr[1])
    }
    return ""
  }
  let token = getCookie('token')
  sessionStorage.setItem('token', token)
}

export default class _Layout extends React.Component {
  state = {
    current: 1
  }
  handleClick = v => {

  }
  render() {
    let { fullScreen = false, breadcrumb = [{
      text: '首页'
    }], showSearch, current, backTopTarget } = this.props
    return (
      <Layout className="flex vertical">
        <Layout.Header>
          <div className="logo"><img width="120" src="/assets/logo.jpg" /></div>
          <Menu
            selectedKeys={ [current] }
            className="page-menu"
            onClick={ this.handleClick }
            mode="horizontal"
            theme="dark"
          >
            {
              menuConfig.map(o => {
                return <Menu.Item key={ o.key }>
                  <a href={ o.href }>
                    <Icon type={ o.icon } />
                    { o.title }
                  </a>
                </Menu.Item>
              })
            }
          </Menu>
          <div className="user flex middle right">
            <Icon type="user" className="head-photo" />
          </div>
        </Layout.Header>
        <Layout.Content>
          <BackTop target={ () => backTopTarget || document.querySelector('.ant-layout-content') } />
          <div className={ `layout-context${fullScreen ? ' full-screen' : ''}` }>
            {
              !fullScreen ? <Breadcrumb>
                <Breadcrumb.Item>
                  PC学院
              </Breadcrumb.Item>
                {
                  breadcrumb.map((o, i) => {
                    return <Breadcrumb.Item key={ String(i) }><a href={ o.link }>{ o.text }</a></Breadcrumb.Item>
                  })
                }
                {
                  showSearch ? <Breadcrumb.Item>
                    <Popover placement="right" content={ <Input.Search
                      placeholder="请输入"
                      onSearch={ value => console.log(value) }
                      style={ { width: 200 } }
                    /> }>
                      <Icon type="search" onClick={ this.handleSearchButton } />
                    </Popover>
                  </Breadcrumb.Item> : ''
                }
              </Breadcrumb> : ''
            }
            <div style={ { marginTop: !fullScreen ? 16 : 0 } }>
              { this.props.children }
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}