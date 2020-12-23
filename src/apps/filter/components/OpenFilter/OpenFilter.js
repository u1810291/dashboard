import { FilterList } from '@material-ui/icons';
import { useOverlay } from 'apps/overlay';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import Modal from '../../../../components/modal';
import { Filter } from '../../containers/Filter/Filter';
import { SideButton, useStyles } from './OpenFilter.styles';

export function OpenFilter({ children, ...props }) {
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const handleCloseModal = useCallback(() => {
    closeOverlay();
  }, [closeOverlay]);

  const openFilterModal = useCallback(() => {
    createOverlay(
      <Modal onClose={handleCloseModal} className={classes.modal}>
        <Filter {...props} onClose={handleCloseModal}>
          {children}
        </Filter>
      </Modal>,
      { additionalClasses: ['modalFixedContent'] });
  }, [children, classes.modal, createOverlay, handleCloseModal, props]);

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
