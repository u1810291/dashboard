import Button from 'components/button';
import { setI18nContext } from 'components/i18n-context';
import { Input } from 'components/inputs';
import Modal from 'components/modal';
import { Field, Formik, withFormik } from 'formik';
import { password, required } from 'lib/validations';
import { flowRight, pickBy } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import CSS from './ChangePasswordModal.module.scss';

const formikSettings = {
  initialValues: {
    oldPassword: '',
    password: '',
    repeatPassword: '',
  },

  validate: (values) => {
    let errors = {};

    errors.oldPassword = required(values.oldPassword)
      || password(values, 'personalSettings.errors.notAllowed', 'oldPassword');
    errors.password = required(values.password)
      || password(values, 'personalSettings.errors.notAllowed', 'password');
    errors.repeatPassword = required(values.repeatPassword)
      || (values.repeatPassword !== values.password && 'personalSettings.errors.repeatPassword');

    errors = pickBy(errors, (v) => v);
    return errors;
  },
};

// TODO: Divide these components

function ModalContent({ handleSubmit, errors, touched, isSubmitting }) {
  return (
    <form onSubmit={handleSubmit}>
      <>
        {touched.oldPassword && errors.oldPassword && (
          <span className={CSS.error}>
            <FormattedMessage id="personalSettings.errors.oldPassword" />
          </span>
        )}
        <Field
          type="password"
          name="oldPassword"
          className={CSS.current}
          component={Input}
          error={touched.oldPassword && errors.oldPassword}
        />
      </>
      <>
        {touched.password && errors.password && (
          <span className={CSS.error}>
            <FormattedMessage id="personalSettings.errors.password" />
          </span>
        )}
        <Field
          type="password"
          name="password"
          component={Input}
          error={touched.password && errors.password}
        />
      </>
      <Field
        type="password"
        name="repeatPassword"
        component={Input}
        error={touched.repeatPassword && errors.repeatPassword}
      />
      <p>
        <Button
          type="submit"
          className={CSS.submit}
          buttonStyle="primary"
          disabled={isSubmitting}
        >
          <FormattedMessage id="apps.settings.personalSettings.change" />
        </Button>
      </p>
    </form>
  );
}

ModalContent.propTypes = {
  errors: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.shape().isRequired,
};

function ChangePasswordModal({ onSubmit }) {
  return (
    <Modal small>
      <main className={CSS.content}>
        <div className={CSS.title}>
          <FormattedMessage id="apps.settings.personalSettings.change" />
        </div>
        <div className={CSS.subtitle}>
          <FormattedMessage id="apps.settings.personalSettings.youCanChange" />
        </div>
        <Formik
          initialValues={formikSettings.initialValues}
          onSubmit={onSubmit}
          validate={formikSettings.validate}
          render={ModalContent}
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
  withFormik(formikSettings),
)(ChangePasswordModal);

ChangePasswordModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
