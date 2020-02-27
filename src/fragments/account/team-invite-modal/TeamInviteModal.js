import Button from 'components/button';
import Modal from 'components/modal';
import { Spinner } from 'apps/layout';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import TeamInviteForm from './TeamInviteForm';

export function TeamInviteModal({ onSubmit, isPosting }) {
  const intl = useIntl();
  const formRef = React.createRef();

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  const handleInviteClick = useCallback(() => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  }, [formRef]);

  return (
    <Modal>
      <header>
        {intl.formatMessage({ id: 'teamTable.inviteModal.title' })}
      </header>
      <main>
        <TeamInviteForm
          ref={formRef}
          handleSubmit={handleSubmit}
        />
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={handleInviteClick}
        >
          {intl.formatMessage({ id: 'teamTable.invite' })}
        </Button>
        {isPosting && <Spinner size="large" />}
      </footer>
    </Modal>
  );
}
