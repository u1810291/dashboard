import React from 'react';
import { FormattedMessage } from 'react-intl';
import { flowRight } from 'lodash/fp';
import { Field, Formik, withFormik } from 'formik';
import { pickBy } from 'lodash';

import { Modal } from 'components/modal';
import Button from 'components/button';
import { Input } from 'components/inputs';
import { setI18nContext } from 'components/i18n-context';
import { required, password } from 'lib/validations';

import CSS from './ChangePasswordModal.module.scss';
import connect from 'react-redux/es/connect/connect';

const formikSettings = {
  initialValues: {
    oldPassword: '',
    password: '',
    repeatPassword: '',
  },

  validate: values => {
    let errors = {};

    errors.oldPassword = required(values.oldPassword);
    errors.password = required(values.password)
      || password(values, 'personalSettings.errors.notAllowed');
    errors.repeatPassword = required(values.repeatPassword)
      || (values.repeatPassword !== values.password && 'personalSettings.errors.repeatPassword');

    errors = pickBy(errors, v => v);
    return errors;
  },
};

function ChangePasswordModal({ onSubmit }) {
  return (
    <Modal small>
      <main className={CSS.content}>
        <div className={CSS.title}>
          <FormattedMessage id="apps.settings.personalSettings.change"/>
        </div>
        <div className={CSS.subtitle}>
          <FormattedMessage id="apps.settings.personalSettings.youCanChange"/>
        </div>
        <Formik
          initialValues={formikSettings.initialValues}
          onSubmit={onSubmit}
          validate={formikSettings.validate}
          render={props => {
            return (
              <form onSubmit={props.handleSubmit}>
                <>
                  {props.touched.oldPassword && props.errors.oldPassword && (
                    <span className={CSS.error}>
                      <FormattedMessage id="personalSettings.errors.oldPassword"/>
                    </span>
                  )}
                  <Field
                    type="password"
                    name="oldPassword"
                    className={CSS.current}
                    component={Input}
                    error={props.touched.oldPassword && props.errors.oldPassword}
                  />
                </>
                <>
                  {props.touched.password && props.errors.password && (
                    <span className={CSS.error}>
                      <FormattedMessage id="personalSettings.errors.password"/>
                    </span>
                  )}
                  <Field
                    type="password"
                    name="password"
                    component={Input}
                    error={props.touched.password && props.errors.password}
                  />
                </>
                <Field
                  type="password"
                  name="repeatPassword"
                  component={Input}
                  error={props.touched.repeatPassword && props.errors.repeatPassword}
                />
                <p>
                  <Button
                    type="submit"
                    className={CSS.submit}
                    buttonStyle="primary"
                    disabled={props.isSubmitting}
                  >
                    <FormattedMessage id="apps.settings.personalSettings.change"/>
                  </Button>
                </p>
              </form>
            );
          }}
        />
      </main>
    </Modal>
  );
}

export default flowRight(
  setI18nContext('personalSettings'),
  connect(
    null,
  ),
  withFormik(formikSettings)
)(ChangePasswordModal)

