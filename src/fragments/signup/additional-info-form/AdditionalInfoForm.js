import React from 'react'
import { Select, Input } from 'src/components/inputs'
import Button from 'src/components/button'
import { Field, Formik } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { FormattedMessage } from 'react-intl'
import { pick, pickBy } from 'lodash'
import { required } from 'src/lib/validations'

const formikSettings = {
  initialValues: {
    businessName: '',
    websiteUrl: '',
    startDate: null,
    verificationNum: null,
    dontKnow: false,
    companySize: null,
    purpose: null,
    alreadyUseJYC: null
  },

  validate: values => {
    let errors = {}

    errors.businessName = required(values.businessName)
    errors.websiteUrl = required(values.websiteUrl)
    errors.startDate = required(values.startDate)
    errors.verificationNum = required(values.verificationNum) && required(values.dontKnow)
    errors.companySize = required(values.companySize)
    errors.alreadyUseJYC = required(values.alreadyUseJYC)
    errors.purpose = required(values.purpose)
    errors = pickBy(errors, v => v)
    return errors
  },

  verificationsNumOptions: [
    {
      label: 'I don\'t know',
      value: 'I don\'t know'
    },
    {
      label: '0–100',
      value: '0–100'
    },
    {
      label: '100–1000',
      value: '100–1000'
    },
    {
      label: '1000–5000',
      value: '1000–5000'
    },
    {
      label: '> 5000',
      value: '> 5000'
    }
  ],

  companySizeOptions: [
    { label: '< 5', value: '< 5' },
    { label: '6–20', value: '6–20' },
    { label: '21–100', value: '21–100' },
    { label: '+100', value: '+100' }
  ],

  purposeOptions: [
    {
      label: 'I need to be compliant with regulations',
      value: 'I need to be compliant with regulations'
    },
    { label: 'I need to manage fraud', value: 'I need to manage fraud' },
    {
      label: 'I want to provide a sense of security to my users',
      value: 'I want to provide a sense of security to my users'
    },
    { label: 'For other reasons', value: 'For other reasons' }
  ],

  startDateOptions: [
    { label: 'Urgently', value: 'urgently' },
    { label: 'Soon', value: 'soon' },
    { label: 'Not sure yet', value: 'not sure yet' }
  ],

  alreadyUseJYCOptions: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]
}

export default
@setI18nContext('additionalInfo.form')
class AdditionalInfoForm extends React.Component {
  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(
      values,
      'businessName',
      'websiteUrl',
      'startDate',
      'verificationNum',
      'dontKnow',
      'companySize',
      'purpose',
      'alreadyUseJYC'
    )
    this.props.handleSubmit(data)
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
              <h1 className={'text-light ' + CSS.title}>
                <FormattedMessage id="additionalInfo.title" />
                <p className="text-secondary">
                  <FormattedMessage id="additionalInfo.subtitle" />
                </p>
              </h1>

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
              <Field
                name="companySize"
                component={Select}
                options={formikSettings.companySizeOptions}
                value={props.values.companySizeOptions}
                error={props.touched.companySize && props.errors.companySize}
              />
              <Field
                name="verificationNum"
                component={Select}
                options={formikSettings.verificationsNumOptions}
                value={props.values.verificationNum}
                error={props.touched.verificationNum && props.errors.verificationNum}
              />
              <Field
                name="alreadyUseJYC"
                component={Select}
                options={formikSettings.alreadyUseJYCOptions}
                value={props.values.alreadyUseJYC}
                error={props.touched.alreadyUseJYC && props.errors.alreadyUseJYC}
              />
              <Field
                name="startDate"
                component={Select}
                options={formikSettings.startDateOptions}
                date={props.values.startDate}
                error={props.touched.startDate && props.errors.startDate}
              />
              <Field
                name="purpose"
                component={Select}
                options={formikSettings.purposeOptions}
                value={props.values.purpose}
                error={props.touched.purpose && props.errors.purpose}
              />
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
