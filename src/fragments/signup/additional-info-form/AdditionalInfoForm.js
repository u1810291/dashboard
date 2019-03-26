import React from 'react'
import CSS from './AdditionalInfoForm.scss'
import { Select, SingleDateInput, Input } from 'src/components/inputs'
import Button from 'src/components/button'
import { Field, Formik } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { FormattedMessage } from 'react-intl'
import { pick, pickBy } from 'lodash'
import Checkbox from 'src/components/checkbox'
import { required } from 'src/lib/validations'
import moment from 'moment'

const formikSettings = {
  initialValues: {
    businessName: '',
    websiteUrl: '',
    startDate: null,
    today: false,
    verificationNum: null,
    dontKnow: false
  },

  validate: values => {
    let errors = {}

    errors.businessName = required(values.businessName)
    errors.websiteUrl = required(values.websiteUrl)
    errors.startDate = required(values.startDate)
    errors.verificationNum = required(values.verificationNum) && required(values.dontKnow)
    errors = pickBy(errors, v => v)
    return errors
  },

  verificationsNumOptions: [
    {
      label: '0-100',
      value: '0-100'
    },
    {
      label: '100-1000',
      value: '100-1000'
    },
    {
      label: '1000-5000',
      value: '1000-5000'
    },
    {
      label: '>5000',
      value: '>5000'
    },
  ]
}


export default
@setI18nContext('additionalInfo.form')
class AdditionalInfoForm extends React.Component {

  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(values, 'startDate', 'verificationNum', 'businessName', 'websiteUrl')
    data.startDate = data.startDate.format('L')
    if (values.dontKnow) {
      data.verificationNum = 'dontKnow'
    } else {
      data.verificationNum = data.verificationNum.value
    }
    this.props.handleSubmit(data)
  }

  onTodayChange = (e, props) => {
    const value = e.target.checked
    props.setFieldValue('today', value)
    if (value) {
      props.setFieldValue('startDate', moment())
    }
  }

  onStartDateChange = (e, props) => {
    props.handleChange(e)
    props.setFieldValue('today', false)
    props.setFieldTouched('startDate', true, true)
  }

  onDontKnowChange = (e, props) => {
    const value = e.target.checked
    props.setFieldValue('dontKnow', value)
    if (value) {
      props.setFieldValue('verificationNum', null)
    }
  }

  onVerificationNumChange = (e, props) => {
    props.handleChange(e)
    props.setFieldValue('dontKnow', false)
    props.setFieldTouched('verificationNum', true, true)
  }

  render() {
    return (
      <Formik
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                type="text"
                name="businessName"
                component={Input}
                error={props.touched.businessName && props.errors.businessName}
              />
              <Field
                type="text"
                name="websiteUrl"
                component={Input}
                error={props.touched.websiteUrl && props.errors.websiteUrl}
              />
              <div className={CSS.row}>
                <div className={CSS.colLeft}>
                  <Field
                    className={CSS.verificationNum}
                    name="verificationNum"
                    component={Select}
                    options={formikSettings.verificationsNumOptions}
                    value={props.values.verificationNum}
                    onChange={(e) => this.onVerificationNumChange(e, props)}
                    error={props.touched.verificationNum && props.errors.verificationNum}
                  />
                </div>
                <div className={CSS.colRight}>
                  <Checkbox
                    className={CSS.checkbox}
                    label="I don't know"
                    checked={props.values.dontKnow}
                    onChange={(e) => this.onDontKnowChange(e, props)}
                  />
                </div>
              </div>
              <div className={CSS.row}>
                <div className={CSS.colLeft}>
                  <Field
                    className={CSS.startDate}
                    name="startDate"
                    component={SingleDateInput}
                    id="startDate"
                    date={props.values.startDate}
                    onChange={(e) => this.onStartDateChange(e, props)}
                    error={props.touched.startDate && props.errors.startDate}
                  />
                </div>
                <div className={CSS.colRight}>
                  <Checkbox
                    className={CSS.checkbox}
                    label="Today"
                    checked={props.values.today}
                    onChange={(e) => this.onTodayChange(e, props)} />
                </div>
              </div>
              <p>
                <Button
                  type="submit"
                  className={CSS.submit}
                  disabled={props.isSubmitting}
                  buttonStyle="primary"
                >
                  <FormattedMessage id="additionalInfo.action" />
                </Button>
              </p>
            </form>
          )
        }}
      />
    )
  }
}
