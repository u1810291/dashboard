import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { RoleRenderGuard } from 'apps/merchant';
import { FiEdit3 } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { WithAgent } from 'models/Collaborator.model';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { selectVerificationId, selectVerificationIsEditable } from 'apps/Verification';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { SupportedLocales } from 'models/Intl.model';
import { ICustomField } from 'models/CustomField.model';
import { fillFieldsWithData } from '../../models/CustomField.model';
import { CustomFieldVerificationList } from '../CustomFieldVerificationList/CustomFieldVerificationList';
import { CustomFieldVerificationInfo, CustomFieldVerificationSectionInfo } from '../CustomFieldVerificationInfo/CustomFieldVerificationInfo';
import { useStyles } from './CustomFieldVerificationCard.styles';
import { CustomFieldVerificationInput, CustomFieldVerificationSectionInput } from '../CustomFieldVerificationInput/CustomFieldVerificationInput';
import { customFieldStartUpdate } from '../../state/CustomField.actions';

export function CustomFieldVerificationCard({ fields, country, isOldVerification }: {
  fields: ICustomField[];
  country: string;
  isOldVerification: boolean;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const verificationId = useSelector<any, string>(selectVerificationId);
  const isEditable = useSelector<any, boolean>(selectVerificationIsEditable);
  const locale = useSelector<any, SupportedLocales>(selectLanguage);

  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  const methods = useForm();
  const { formState: { isSubmitting } } = methods;

  const handleFormSubmit: SubmitHandler<unknown> = useCallback(async (data) => {
    const fieldsWithValue = fillFieldsWithData(data, fields, locale);
    await dispatch(customFieldStartUpdate(verificationId, fieldsWithValue, country));
    setIsEditingMode(false);
  }, [country, dispatch, fields, locale, verificationId]);

  if (isEditingMode) {
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={classes.wrapper}>
          <CustomFieldVerificationList
            fields={fields}
            country={country}
            atomicContainer={CustomFieldVerificationInput}
            sectionContainer={CustomFieldVerificationSectionInput}
          />
          <Grid container justify="space-between" className={classes.buttonWrapper}>
            <Button
              className={classNames(classes.button, classes.buttonHalf)}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress color="inherit" size={17} /> : formatMessage('CustomField.btn.save')}
            </Button>
            <Button
              className={classNames(classes.button, classes.buttonHalf)}
              disabled={isSubmitting}
              onClick={() => setIsEditingMode(false)}
            >
              {formatMessage('cancel')}
            </Button>
          </Grid>
        </form>
      </FormProvider>
    );
  }

  return (
    <Grid container direction="column" className={classes.wrapper}>
      <Grid container className={classes.inputsWrapper} justify="space-between">
        <CustomFieldVerificationList
          country={country}
          fields={fields}
          atomicContainer={CustomFieldVerificationInfo}
          sectionContainer={CustomFieldVerificationSectionInfo}
        />
      </Grid>
      {!isOldVerification && isEditable && (
        <RoleRenderGuard roles={WithAgent}>
          <Box className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              fullWidth
              onClick={() => {
                setIsEditingMode(true);
                methods.reset();
              }}
            >
              <FiEdit3 className={classes.buttonEditIcon} />
              {formatMessage('CustomField.btn.edit')}
            </Button>
          </Box>
        </RoleRenderGuard>
      )}
    </Grid>
  );
}
