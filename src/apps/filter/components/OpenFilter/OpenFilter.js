import { FilterList } from '@material-ui/icons';
import { useOverlay, Modal } from 'apps/overlay';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Filter } from '../../containers/Filter/Filter';
import { SideButton, useStyles } from './OpenFilter.styles';

export function OpenFilter({ children, qa, ...props }) {
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
      data-qa={qa}
    >
      {intl.formatMessage({ id: 'VerificationFilter.title' })}
    </SideButton>
  );
}
