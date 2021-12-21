import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputLabel, Typography } from '@material-ui/core';
import { useFormatMessage } from 'apps/intl';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { WithActionDescriptionBordered, FileUploadButton } from 'apps/ui';
import { useStyles, RoundedButton } from './CustomWatchlistModalValidationFileUploadForm.styles';
import { FlowWatchlistUi, CustomWatchlistModalValidationInputs, CustomWatchlistFileExt, CustomWatchlistUpload } from '../../models/CustomWatchlist.models';
import * as api from '../../client/CustomWatchlist.client';
import { CSVSeparatorSelect } from '../CSVSeparatorSelect/CSVSeparatorSelect';
import { selectIsWatchlistsContentLoading } from '../../state/CustomWatchlist.selectors';

export function CustomWatchlistModalValidationFileUploadForm({ watchlist, onFileUploaded }: {
  watchlist?: FlowWatchlistUi;
  onFileUploaded?: (data: CustomWatchlistUpload) => void;
}) {
  const formatMessage = useFormatMessage();
  const merchantId = useSelector(selectMerchantId);
  const isWatchlistsContentLoading = useSelector(selectIsWatchlistsContentLoading);
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>(watchlist?.process?.inputSourceFileName);
  const { setValue, setError, clearErrors, formState: { errors } } = useFormContext();

  useEffect(() => {
    if (fileName) {
      setValue(CustomWatchlistModalValidationInputs.FileName, fileName);
    }
  }, [fileName, setValue]);

  const handleUploadFile = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const form = new FormData();
    form.append('media', file);
    onFileUploaded(null);
    try {
      const { data } = await api.uploadMerchantWatchlist(merchantId, form);
      onFileUploaded(data);
      setValue(CustomWatchlistModalValidationInputs.FileKey, data.key);
      clearErrors(CustomWatchlistModalValidationInputs.FileKey);
    } catch {
      setError(CustomWatchlistModalValidationInputs.FileKey, {
        message: formatMessage('CustomWatchlist.settings.watchlist.fileErrorUpload'),
      });
    }
  }, [merchantId, formatMessage, setValue, clearErrors, onFileUploaded, setError]);

  const extFile = useMemo(() => {
    const arr = fileName?.split('.') || [];
    if (arr?.length !== 0) {
      return arr[arr.length - 1];
    }

    return '';
  }, [fileName]);

  return (
    <>
      <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
        <Typography variant="subtitle2">
          {formatMessage('CustomWatchlist.settings.modal.button.uploadFile.label.title')}
        </Typography>
        <Typography variant="body1" className={classes.colorGrey}>
          {formatMessage('CustomWatchlist.settings.modal.button.uploadFile.label.subTitle')}
        </Typography>
      </InputLabel>
      {fileName ? (
        <WithActionDescriptionBordered description={fileName} error={errors[CustomWatchlistModalValidationInputs.FileKey]?.message}>
          <FileUploadButton
            onChange={handleUploadFile}
            accept=".csv"
            renderButton={(
              <RoundedButton>
                {formatMessage('CustomWatchlist.settings.modal.button.uploadFile.reload')}
              </RoundedButton>
            )}
          />
        </WithActionDescriptionBordered>
      ) : (
        <FileUploadButton onChange={handleUploadFile} accept=".csv" isPrefixIconDisplayed={!isWatchlistsContentLoading} disabled={isWatchlistsContentLoading}>
          {isWatchlistsContentLoading && <CircularProgress color="inherit" size={17} />}
          {!isWatchlistsContentLoading && formatMessage('CustomWatchlist.settings.modal.button.uploadFile')}
        </FileUploadButton>
      )}
      {extFile === CustomWatchlistFileExt.Csv && <CSVSeparatorSelect />}
    </>
  );
}
