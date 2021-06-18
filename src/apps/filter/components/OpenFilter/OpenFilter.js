import { FilterList } from '@material-ui/icons';
import { Modal, useOverlay } from 'apps/overlay';
import { selectUserRegistrationDate } from 'apps/user/state/user.selectors';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Filter } from '../../containers/Filter/Filter';
import { SideButton, useStyles } from './OpenFilter.styles';

export function OpenFilter({ children, qa, ...props }) {
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const registerDateSelector = useSelector(selectUserRegistrationDate);
  const registerDate = new Date(registerDateSelector);
  const handleCloseModal = useCallback(() => {
    closeOverlay();
  }, [closeOverlay]);

  const openFilterModal = useCallback(() => {
    createOverlay((
      <Modal onClose={handleCloseModal} className={classes.modal}>
        <Filter {...props} fromMonth={registerDate} onClose={handleCloseModal}>
          {children}
        </Filter>
      </Modal>
    ), {
      additionalClasses: ['modalFixedContent'],
    });
  }, [children, classes.modal, createOverlay, handleCloseModal, props, registerDate]);

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
