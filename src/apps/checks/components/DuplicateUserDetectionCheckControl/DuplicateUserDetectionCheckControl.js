import { Switch } from '@material-ui/core';
import { notification } from 'apps/ui';
import { VerificationPatternTypes } from 'models/Verification.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectDuplicateUserDetectionCheck } from 'state/merchant/merchant.selectors';
import { merchantUpdateFlow } from '../../../../state/merchant/merchant.actions';
import { useStyles } from './DuplicateUserDetectionCheckControl.styles';

export function DuplicateUserDetectionCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const duplicateUserDetectionCheck = useSelector(selectDuplicateUserDetectionCheck);
  const [state, setState] = useState(false);

  const handleChange = useCallback(async (event) => {
    const isChecked = event.target.checked;
    try {
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.DuplicateUserValidation]: isChecked,
        },
      }));
      setState(isChecked);
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: intl.formatMessage({ id: 'Product.checks.duplicateUserDetection.title' }) }));
    }
  }, [dispatch, intl]);

  useEffect(() => {
    setState(duplicateUserDetectionCheck);
  }, [duplicateUserDetectionCheck]);

  return (
    <Switch
      name="duplicateUserDetectionCheck"
      color="primary"
      size="small"
      checked={state}
      onChange={handleChange}
      className={classes.switcher}
    />
  );
}
