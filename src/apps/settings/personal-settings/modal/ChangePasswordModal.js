import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, Formik } from 'formik';
import { pickBy } from 'lodash';

import { Modal } from 'components/modal';
import Button from 'components/button';
import { Input } from 'components/inputs';
import { setI18nContext } from 'components/i18n-context';
import { required } from 'lib/validations';

import CSS from './ChangePasswordModal.module.scss';

function ChangePasswordModal({ onSubmit }) {
  const formikSettings = {
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },

    validate: values => {
      let errors = {};

      errors.currentPassword = required(values.currentPassword);
      errors.newPassword = required(values.newPassword);
      errors.repeatPassword = required(values.repeatPassword);

      errors = pickBy(errors, v => v);
      return errors;
    },
  };

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
                  {props.touched.currentPassword && props.errors.currentPassword && (
                    <span className={CSS.error}>
                      <FormattedMessage id="personalSettings.errors.currentPassword"/>
                    </span>
                  )}
                  <Field
                    type="password"
                    name="currentPassword"
                    className={CSS.current}
                    component={Input}
                    error={props.touched.currentPassword && props.errors.currentPassword}
                  />
                </>
                <>
                  {props.touched.newPassword && props.errors.newPassword && (
                    <span className={CSS.error}>
                      <FormattedMessage id="personalSettings.errors.newPassword"/>
                    </span>
                  )}
                  <Field
                    type="password"
                    name="newPassword"
                    component={Input}
                    error={props.touched.newPassword && props.errors.newPassword}
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

export default setI18nContext('personalSettings')(ChangePasswordModal);
