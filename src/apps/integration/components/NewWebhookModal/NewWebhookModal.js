import Button from 'components/button';
import { setI18nContext } from 'components/i18n-context';
import { Input } from 'components/inputs';
import Items from 'components/items';
import Modal from 'components/modal';
import { Field, Form, withFormik } from 'formik';
import { flowRight } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

// todo: fix 'unused' onSave

// eslint-disable-next-line no-unused-vars
function NewWebhookModal({ onSave, onClose }) {
  return (
    <Form>
      <Modal>
        <main>
          <Items flow="row">
            <h1>
              <FormattedMessage id="fragments.account.new_webhook_modal.title" />
            </h1>
            <section>
              <Field name="url" component={Input} />
              <Field name="secret" component={Input} />
            </section>
          </Items>
        </main>
        <footer>
          <Items>
            <Button buttonStyle="primary" type="submit">
              <FormattedMessage id="done" />
            </Button>
            <Button onClick={onClose}>
              <FormattedMessage id="cancel" />
            </Button>
          </Items>
        </footer>
      </Modal>
    </Form>
  );
}

const formikSettings = {
  enableReinitialize: true,
  handleSubmit(values, { props, setStatus }) {
    setStatus({});
    const { url, secret } = values;
    props
      .onSave(url, secret)
      .then(props.onClose)
      .catch(setStatus);
  },
};

export default flowRight(
  setI18nContext('onboarding.webhooks'),
  withFormik(formikSettings),
)(NewWebhookModal);

NewWebhookModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
