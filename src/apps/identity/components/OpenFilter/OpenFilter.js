import { FilterList } from '@material-ui/icons';
import { useOverlay } from 'apps/overlay';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import Modal from '../../../../components/modal';
import { VerificationFilter } from '../VerificationFilter/VerificationFilter';
import { SideButton, useStyles } from './OpenFilter.styles';

export function OpenFilter() {
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const handleCloseModal = useCallback(() => {
    closeOverlay();
  }, [closeOverlay]);

  const openFilterModal = useCallback(() => {
    createOverlay(
      <Modal onClose={handleCloseModal} className={classes.modal}>
        <VerificationFilter onClose={handleCloseModal} />
      </Modal>,
      { additionalClasses: ['modalFixedContent'] });
  }, [classes.modal, createOverlay, handleCloseModal]);

  return (
    <SideButton
      variant="contained"
      onClick={openFilterModal}
      startIcon={<FilterList />}
    >
      {intl.formatMessage({ id: 'VerificationFilter.title' })}
    </SideButton>
  );
}
