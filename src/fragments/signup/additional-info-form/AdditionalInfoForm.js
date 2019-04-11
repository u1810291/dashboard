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
    startDate: null,
    companySize: null,
    purpose: null,
    alreadyUseKYC: null
  },

  validate: values => {
    let errors = {}

    errors.businessName = required(values.businessName)
    errors.startDate = required(values.startDate)
    errors.companySize = required(values.companySize)
    errors.alreadyUseKYC = required(values.alreadyUseKYC)
    errors.purpose = required(values.purpose)
    errors = pickBy(errors, v => v)
    return errors
  },

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

  alreadyUseKYCOptions: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
}

class AdditionalInfoForm extends React.Component {
  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(
      values,
      'businessName',
      'startDate',
      'companySize',
      'purpose',
      'alreadyUseKYC'
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
                name="companySize"
                component={Select}
                options={formikSettings.companySizeOptions}
                value={props.values.companySize}
                error={props.touched.companySize && props.errors.companySize}
              />
              <Field
                name="alreadyUseKYC"
                component={Select}
                options={formikSettings.alreadyUseKYCOptions}
                value={props.values.alreadyUseKYC}
                error={
                  props.touched.alreadyUseKYC && props.errors.alreadyUseKYC
                }
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

export default setI18nContext('additionalInfo.form')(AdditionalInfoForm)
