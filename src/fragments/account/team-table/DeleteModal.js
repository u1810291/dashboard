import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from 'components/modal';
import Button from 'components/button';
import { Spinner } from 'apps/layout';

export default function DeleteModal({
  className,
  user,
  onSubmit,
  isDeleting,
  ...modalProps
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal {...modalProps} className={className}>
      <header>
        <FormattedMessage id="teamTable.deleteModal.title" />
      </header>
      <main>
        <FormattedMessage
          id="teamTable.deleteModal.description"
          values={{
            userName: <strong>{user.name || ''}</strong>,
          }}
        />
      </main>
      <footer className="modal--footer-center">
        <Button type="submit" buttonStyle="danger" onClick={() => onSubmit(user.id)}>
          <FormattedMessage id="teamTable.deleteModal.delete" />
        </Button>
        {isDeleting && <Spinner size="large" />}
      </footer>
    </Modal>
  );
}

DeleteModal.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};
