import React, { Component } from 'react'
import { Form, Select, Input, Table, Button, Modal, Collapse, Icon, message, Switch } from 'antd'
import exceed from 'utils/apimap'
import querystring from 'query-string'
import * as Survey from 'survey-react'
import _ from 'lodash'

import 'survey-react/survey.min.css'
import './style.scss'

import './style.scss'

const { id } = querystring.parse(location.search)

const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 19 },
  }
}

message.config({
  top: 120,
  getContainer: () => document.getElementById('root')
})

const sTypes = {
  1: 'radiogroup',
  2: 'radiogroup',
  3: 'text'
}

const types = [
  {
    label: "满意度调查",
    value: 1
  }, {
    label: "自定义选项",
    value: 2
  }, {
    label: "问答",
    value: 3
  }
].map(o => <Select.Option value={o.value} title={o.label}>{o.label}</Select.Option>)

const allOptions = [
  {
    label: '选项一',
    value: 0,
    required: true
  }, {
    label: '选项二',
    value: 1,
    required: true
  }, {
    label: '选项三',
    value: 2
  }, {
    label: '选项四',
    value: 3
  }, {
    label: '选项五',
    value: 4
  }
]

const choices = [
  '非常满意',
  '满意',
  '一般',
  '不满意',
  '非常不满意'
].map((o, i) => {
  return {
    text: o,
    value: i
  }
})

class IForm extends Component {
  state = {
    title: '',
    type: 1,
    options: {}
  }
  componentDidMount() {
    if (this.props.value) {
      this.setState({
        ...this.props.value
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        ...nextProps.value
      })
    }
  }
  emitChange = () => {
    const { onChange = e => e } = this.props
    onChange(this.value)
  }
  handleChangeType = (val) => {
    this.setState({
      type: val
    }, this.emitChange)
  }
  handleChangeOption = index => e => {
    let { options } = this.state
    options[index] = e.target.value
    this.setState({
      options
    }, this.emitChange)
  }
  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    }, this.emitChange)
  }
  get value() {
    return this.state
  }
  render() {
    const { type, title, options = {} } = this.state
    return <Form style={{ marginTop: 16 }} {...formItemLayout}>
      <Form.Item required label="问题">
        <Input value={title} onChange={this.handleTitleChange} />
      </Form.Item>
      <Form.Item required label="问卷类型">
        <Select value={Number(this.state.type)} onChange={this.handleChangeType}>
          {types}
        </Select>
      </Form.Item>
      {
        type === 2 ? allOptions.map(o => {
          return <Form.Item required label={o.label} required={o.required}>
            <Input value={options[o.value]} onChange={this.handleChangeOption(o.value)} />
          </Form.Item>
        }) : ''
      }
    </Form>
  }
}

const Panel = Collapse.Panel

const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 8,
  border: 0,
  overflow: 'hidden',
}

var survey = data => new Survey.Model({
  'showProgressBar': "top", 'pages': data
})
Survey.surveyLocalization.currentLocaleValue = 'zh-cn'

export default class Root extends Component {
  state = {
    visible: false,
    items: [],
    activeKey: [],
    name: '',
    enabled: true
  }
  componentDidMount() {
    if (id) {
      exceed.fetch({
        api: 'querySurveyItem',
        data: {
          id
        }
      }).then(res => {
        const { name, data, enabled = false } = res
        this.setState({
          name,
          enabled,
          items: data,
          activeKey: data.map((o, i) => String(i))
        })
      })
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  handleCreate = () => {
    this.setState({
      items: this.state.items.concat({}),
      activeKey: Array.apply(this, { length: this.state.items.length + 1 }).map(Function.call, Number).map(o => String(o))
    })
  }
  handleRemove = index => () => {
    const { items } = this.state
    items.splice(index, 1)
    this.setState({
      items: items,
      activeKey: Array.apply(this, { length: items.length + 1 }).map(Function.call, Number).map(o => String(o))
    })
  }
  handleSubmit = () => {
    let value = this.forms.map(o => o.value).filter(o => o.title).map(o => {
      o.options = Object.values(o.options)
      return o
    })
    if (!this.state.name) {
      message.error('请先输入标题')
      return
    }
    if (!value.length) {
      message.error('至少需要存在一项完整项')
      return
    }
    exceed.fetch({
      api: id ? 'updateSurveyItem' : 'insertSurveyList',
      data: {
        id,
        enabled: this.state.enabled,
        name: this.state.name,
        data: value
      }
    }).then(res => {
      if (res.code === 0) {
        message.info('提交成功')
        return
      }
      message.info('提交失败：' + res.errorMsg)
    })
  }
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }
  handleEnableChange = v => {
    this.setState({
      enabled: v
    }, () => exceed.fetch({
      api: 'updateSurveyItem',
      data: {
        id: id,
        enabled: this.state.enabled,
        name: this.state.name,
        data: this.state.items
      }
    }))
  }
  forms = []
  handleChange = index => val => {
    const { items } = this.state
    items[index] = val
    this.setState({
      items
    })
  }
  get model() {
    let val = this.state.items.map(o => {
      o.options = Object.values(o.options || {})
      return o
    }).filter(o => o.title)
    if (val.length === 0) return null
    return survey([
      {
        isRequired: true,
        questions: val.map((o, i) => {
          return {
            type: sTypes[o.type],
            title: o.title,
            name: String(i),
            choices: Number(o.type) === 2 ? o.options : choices,
            isRequired: true
          }
        })
      }
    ])
  }
  render() {
    const { items } = this.state
    const model = this.model
    return <div className="flex context">
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="left">
        <div style={{ padding: 20, background: '#f3f3f7', boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 2 }}>
          <Button onClick={this.handleCreate}><Icon type="plus" />增加问卷题型</Button>
          <Button onClick={this.handleSubmit} disabled={items.length === 0} style={{ marginLeft: 12 }} type="primary">提交</Button>
          <Switch onChange={this.handleEnableChange} style={{ float: 'right', marginTop: 5 }} checkedChildren="启用" unCheckedChildren="禁用" checked={this.state.enabled} />
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          <Input value={this.state.name} onChange={this.handleNameChange} style={{ marginBottom: 20 }} placeholder="输入标题" />
          <Collapse
            activeKey={this.state.activeKey}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            bordered={false}>
            {
              items.map((o, i) => {
                return <Panel extra={<Icon title="删除" type="delete" onClick={this.handleRemove(i)} />} header={'问卷调查：' + (i + 1)} key={i} style={customPanelStyle}>
                  <IForm onChange={this.handleChange(i)} value={o} ref={ref => {
                    if (ref) {
                      this.forms[i] = ref
                    }
                  }} />
                </Panel>
              })
            }
          </Collapse>
        </div>
      </div>
      <div className="preview">
        {
          model ? <Survey.Survey model={this.model} /> : ''
        }
      </div>
    </div>
  }
}