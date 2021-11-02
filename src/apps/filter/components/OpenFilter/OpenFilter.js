import { FilterList } from '@material-ui/icons';
import { Modal, useOverlay } from 'apps/overlay';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantCreatedAt } from 'state/merchant/merchant.selectors';
import { zeroTime } from 'lib/date';
import dayjs from 'dayjs';
import { Filter } from '../../containers/Filter/Filter';
import { SideButton, useStyles } from './OpenFilter.styles';

export function OpenFilter({
  children,
  qa,
  ...props
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const registerDateSelector = useSelector(selectMerchantCreatedAt);
  const registerDate = useMemo(() => new Date(registerDateSelector), [registerDateSelector]);
  const handleCloseModal = useCallback(() => {
    closeOverlay();
  }, [closeOverlay]);

  const openFilterModal = useCallback(() => {
    createOverlay((
      <Modal onClose={handleCloseModal} className={classes.modal}>
        <Filter {...props} fromMonth={dayjs(registerDate).set(zeroTime).toDate()} onClose={handleCloseModal}>
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
