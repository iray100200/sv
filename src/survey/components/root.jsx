import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import * as Survey from 'survey-react'

import 'survey-react/survey.min.css'
import './style.scss'

const breadcrumb = [
  {
    text: '问卷调查'
  }
]

var json = {
  title: "产品调查问卷", showProgressBar: "top", pages: [
    {
      questions: [
        {
          type: "matrix", name: "Quality", title: "满意度调查A",
          columns: [{ value: 1, text: "非常不满意" },
          { value: 2, text: "不满意" },
          { value: 3, text: "一般" },
          { value: 4, text: "满意" },
          { value: 5, text: "非常满意" }],
          rows: [{ value: "affordable", text: "Product is affordable" },
          { value: "does what it claims", text: "Product does what it claims" },
          { value: "better then others", text: "Product is better than other products on the market" },
          { value: "easy to use", text: "Product is easy to use" }]
        },
        {
          type: "rating", name: "satisfaction", title: "满意度调查B",
          mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied"
        },
        {
          type: "rating", name: "recommend friends", visibleIf: "{satisfaction} > 3",
          title: "How likely are you to recommend the Product to a friend or co-worker?",
          mininumRateDescription: "Will not recommend", maximumRateDescription: "I will recommend"
        },
        { type: "comment", name: "suggestions", title: "满意度调查C", }
      ]
    },
    {
      questions: [
        {
          type: "radiogroup", name: "price to competitors",
          title: "Compared to our competitors, do you feel the Product is",
          choices: ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
        },
        {
          type: "radiogroup", name: "price", title: "Do you feel our current price is merited by our product?",
          choices: ["correct|Yes, the price is about right",
            "low|No, the price is too low for your product",
            "high|No, the price is too high for your product"]
        },
        {
          type: "multipletext", name: "pricelimit", title: "What is the... ",
          items: [{ name: "mostamount", title: "Most amount you would every pay for a product like ours" },
          { name: "leastamount", title: "The least amount you would feel comfortable paying" }]
        }
      ]
    },
    {
      questions: [
        {
          type: "text", name: "email",
          title: "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
        }
      ]
    }
  ]
}
var model = new Survey.Model(json)
Survey.surveyLocalization.currentLocaleValue = 'zh-cn'

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchLayout())
  }
  render() {
    return <Layout breadcrumb={ breadcrumb } current="survey">
      <div>
        <Survey.Survey model={ model } />
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)