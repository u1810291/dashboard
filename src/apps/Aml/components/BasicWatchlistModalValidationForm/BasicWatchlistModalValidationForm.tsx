import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { FiChevronLeft } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { useLongPolling } from 'lib/longPolling.hook';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ButtonStyled } from 'apps/ui';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { Loadable } from 'models/Loadable.model';
import { IWatchlist, WatchlistProcessStatusTypes, IWatchlistUpload, IWatchlistGroup, IWatchlistContent } from 'models/Watchlist.model';
import { selectCurrentBasicWatchlistId, selectCurrentBasicWatchlistModel, selectIsWatchlistsContentModel, selectCurrentBasicWatchlistStatus, selectCurrentBasicWatchlistHeadersModel, selectCurrentBasicWatchlistIsFileAvailable, selectWatchlistsGroups, selectWatchlistsModel } from '../../state/Aml.selectors';
import { updateCurrentWatchlistProcess, basicWatchlistLoadById, getBasicWatchlistHeaders, getBasicWatchlistShortValidation } from '../../state/Aml.actions';
import { useStyles } from './BasicWatchlistModalValidationForm.styles';
import { BasicWatchlistModalValidationFileUploadForm } from '../BasicWatchlistModalValidationFileUploadForm/BasicWatchlistModalValidationFileUploadForm';
import { BasicWatchlistModalValidationSubmitButton } from '../BasicWatchlistModalValidationSubmitButton/BasicWatchlistModalValidationSubmitButton';
import { IBasicWatchlistModalValidationInputs, BasicWatchlistModalValidationInputTypes, basicWatchlistsPollingDelay, IBasicWatchlistGroupsOption } from '../../models/Aml.model';
import { BasicWatchlistModalValidationFormSelect } from '../BasicWatchlistModalValidationFormSelect/BasicWatchlistModalValidationFormSelect';
import { BasicWatchlistMappingValidation } from '../BasicWatchlistMappingValidation/BasicWatchlistMappingValidation';

export function BasicWatchlistModalValidationForm({ watchlist, onClose, onSubmit }: {
  onClose: () => void;
  onSubmit: (values: IBasicWatchlistModalValidationInputs, watchlist?: Partial<IWatchlist>) => void;
  watchlist?: IWatchlist;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  const merchantId = useSelector<any, string>(selectMerchantId);
  const currentWatchlistId = useSelector<any, number>(selectCurrentBasicWatchlistId);
  const currentWatchlistStatus = useSelector<any, WatchlistProcessStatusTypes | null>(selectCurrentBasicWatchlistStatus);
  const isCurrentBasicWatchlistIsFileAvailable = useSelector<any, boolean>(selectCurrentBasicWatchlistIsFileAvailable);
  const watchlistsGroups = useSelector<any, IWatchlistGroup[]>(selectWatchlistsGroups);
  const { isLoading: isCurrentBasicWatchlistHeadersLoading, error: currentBasicWatchlistHeadersErrorType } = useSelector<any, Loadable<string[]>>(selectCurrentBasicWatchlistHeadersModel);
  const { isLoading: isCurrentBasicWatchlistIsLoading } = useSelector<any, Loadable<IWatchlist | null>>(selectCurrentBasicWatchlistModel);
  const { isLoading: isWatchlistsContentLoading } = useSelector<any, Loadable<IWatchlistContent>>(selectIsWatchlistsContentModel);
  const { isLoading: isWatchlistsLoading } = useSelector<any, Loadable<IWatchlist[]>>(selectWatchlistsModel);

  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<string | null>(watchlist?.process?.inputSourceFileKey ?? null);
  const formMethods = useForm<IBasicWatchlistModalValidationInputs>({
    defaultValues: {
      [BasicWatchlistModalValidationInputTypes.Name]: watchlist?.name,
      [BasicWatchlistModalValidationInputTypes.CsvSeparator]: watchlist?.process?.csvSeparator,
      [BasicWatchlistModalValidationInputTypes.Group]: watchlist?.groupId,
    },
  });
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = formMethods;

  const isWatchlistCompleted = currentWatchlistStatus === WatchlistProcessStatusTypes.Completed;
  const isWatchlistPending = currentWatchlistStatus === WatchlistProcessStatusTypes.Pending;
  const isWatchlistRunning = currentWatchlistStatus === WatchlistProcessStatusTypes.Running;
  const isSubmitRestricted = !!(!fileKey || isCurrentBasicWatchlistIsLoading || isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isCurrentBasicWatchlistHeadersLoading || currentBasicWatchlistHeadersErrorType || !isCurrentBasicWatchlistIsFileAvailable);
  const isEdit = !!currentWatchlistId;

  const handleWatchlistLoad = (isReload: boolean) => {
    if (currentWatchlistId && isReload) {
      dispatch(basicWatchlistLoadById(merchantId, currentWatchlistId));
    }
  };

  useLongPolling(handleWatchlistLoad, basicWatchlistsPollingDelay, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: true,
    isDone: isWatchlistCompleted || isWatchlistPending,
  });

  const nameRegister = register(BasicWatchlistModalValidationInputTypes.Name, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 40,
      message: formatMessage('Watchlist.validation.name.label'),
    },
  });

  const handleFormSubmit: SubmitHandler<IBasicWatchlistModalValidationInputs> = (values) => {
    if (isSubmitRestricted) {
      return;
    }

    try {
      const submitValues = {
        ...values,
        [BasicWatchlistModalValidationInputTypes.FileKey]: values[BasicWatchlistModalValidationInputTypes.FileKey] || fileKey,
        [BasicWatchlistModalValidationInputTypes.Group]: values[BasicWatchlistModalValidationInputTypes.Group],
      };

      setIsSubmittingError(false);
      onSubmit(submitValues, { ...watchlist, id: currentWatchlistId });
    } catch (error) {
      setIsSubmittingError(true);
    }
  };

  const handleFileUploaded = useCallback((data: IWatchlistUpload) => {
    const formValues = getValues();
    setFileKey(data?.key);
    if (data?.key) {
      const headersBody = { [BasicWatchlistModalValidationInputTypes.FileKey]: data.key, [BasicWatchlistModalValidationInputTypes.CsvSeparator]: formValues[BasicWatchlistModalValidationInputTypes.CsvSeparator] };

      if (isEdit) {
        dispatch(updateCurrentWatchlistProcess(formValues));
        dispatch(getBasicWatchlistShortValidation(merchantId, {
          [BasicWatchlistModalValidationInputTypes.FileKey]: formValues[BasicWatchlistModalValidationInputTypes.FileKey] || fileKey,
          [BasicWatchlistModalValidationInputTypes.CsvSeparator]: formValues[BasicWatchlistModalValidationInputTypes.CsvSeparator],
          [BasicWatchlistModalValidationInputTypes.Mapping]: formValues[BasicWatchlistModalValidationInputTypes.Mapping],
        }, isEdit));

        return;
      }

      dispatch(getBasicWatchlistHeaders(merchantId, headersBody));
    }
  }, [merchantId, isEdit, fileKey, dispatch, getValues]);

  const groupOptions = useMemo<IBasicWatchlistGroupsOption[]>(() => watchlistsGroups.map((group) => ({ label: group.name, value: group.id })), [watchlistsGroups]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <Grid container direction="row" spacing={2} className={classes.marginBottom50}>
          <Grid item xs={6}>
            <Box mb={1}>
              <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                <Typography variant="subtitle2">
                  {formatMessage('Watchlist.settings.modal.input.name.label')}
                  {' / '}
                  {formatMessage('Watchlist.settings.modal.input.nameLocalise.label')}
                </Typography>
              </InputLabel>
              <TextField
                {...nameRegister}
                id="watchlist-name"
                defaultValue={watchlist?.name || ''}
                helperText={errors?.[BasicWatchlistModalValidationInputTypes.Name]?.message}
                error={!!errors[BasicWatchlistModalValidationInputTypes.Name]}
                type="input"
                variant="outlined"
                fullWidth
                placeholder={formatMessage('Watchlist.settings.modal.input.name.placeholder')}
              />
            </Box>
            <Box mb={3}>
              <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                <Typography variant="subtitle2">
                  {formatMessage('Watchlist.settings.modal.input.group.label')}
                </Typography>
              </InputLabel>
              <BasicWatchlistModalValidationFormSelect options={groupOptions} name={BasicWatchlistModalValidationInputTypes.Group} />
            </Box>
            <Box mb={3}>
              <BasicWatchlistModalValidationFileUploadForm watchlist={watchlist} onFileUploaded={handleFileUploaded} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mb={2}>
              <Typography variant="subtitle2">
                {formatMessage('Watchlist.settings.modal.validationFields.title')}
              </Typography>
              <Typography variant="body1" className={classes.colorGrey}>
                {formatMessage('Watchlist.settings.modal.validationFields.subTitle')}
              </Typography>
            </Box>
            <BasicWatchlistMappingValidation
              isSubmittingError={isSubmittingError}
              isEdit={isEdit}
              hasOptions={!(isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isCurrentBasicWatchlistHeadersLoading)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.buttonContainer}>
          <Grid item xs={6}>
            <ButtonStyled variant="outlined" color="primary" size="large" fullWidth onClick={onClose}>
              <FiChevronLeft />
              {' '}
              {formatMessage('Watchlist.settings.modal.button.back')}
            </ButtonStyled>
          </Grid>
          <Grid item xs={6} className={classes.validationHelperWrap}>
            {isWatchlistRunning && (
              <Box className={classes.validationHelper}>
                <Box>{formatMessage('Watchlist.settings.modal.validation.helper')}</Box>
              </Box>
            )}
            <BasicWatchlistModalValidationSubmitButton
              loading={isWatchlistsLoading || isSubmitting || isWatchlistRunning || isWatchlistsContentLoading}
              isWatchlistRunning={isWatchlistRunning}
              disabled={isSubmitRestricted}
              isEdit={isEdit}
            />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
