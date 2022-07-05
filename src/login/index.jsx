import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Input, Tooltip, Icon, Button, Checkbox, message } from 'antd'
import exceed from 'utils/apimap'

import './style.scss'

const login = (account, password) => {
  return exceed.fetch({
    api: 'login',
    data: {
      account,
      password
    }
  })
}

class Page extends Component {
  state = {
    account: '',
    password: '',
    rememberme: false
  }
  login = () => {
    let { rememberme, account, password } = this.state
    if (!account) {
      message.warning('请输入账号')
      return
    }
    if (!password) {
      message.warning('请输入密码')
      return
    }
    login(account, password).then(res => {
      if (res.code === 0) {
        document.cookie = `token=${res.token}`
        if (rememberme) {
          localStorage.setItem('token', res.token)
          sessionStorage.removeItem('token')
        } else {
          localStorage.removeItem('token')
          sessionStorage.setItem('token', res.token)
        }
        document.cookie = `expires=${rememberme ? (() => {
          var date = new Date()
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
          return date.toGMTString()
        })() : '0'}`
        location.href = '/study'
      } else {
        message.error('用户名或密码错误')
      }
    })
  }
  render() {
    let { rememberme, account, password } = this.state
    return <div className="login-card">
      <form autocomplete='off' action="/login">
        <div className="logo-context">
          <img height="56" src="/assets/logo.jpg" />
        </div>
        <div style={{ padding: 24 }} className="content">
          <h2>
            <Icon type="safety-certificate" style={{ position: 'relative', top: 1 }} /> 账号登录</h2>
          <p>
            <Input
              value={account}
              onChange={e => {
                this.setState({
                  account: e.currentTarget.value
                })
              }}
              placeholder="请输入账号"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </p>
          <p>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
              onChange={e => {
                this.setState({
                  password: e.currentTarget.value
                })
              }} />
          </p>
          <p>
            <Checkbox checked={rememberme} onChange={e => {
              this.setState({
                rememberme: e.target.checked
              })
            }}>记住我的登陆凭证</Checkbox>
          </p>
          <p>
            <Button type="primary" onClick={this.login} style={{ width: '100%' }}>登录</Button>
          </p>
        </div>
      </form>
    </div>
  }
}

ReactDOM.render(<Page></Page>, document.getElementById('root'))