import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputLabel, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { FileUploadButton } from 'apps/ui/components/FileUploadButton/FileUploadButton';
import { FlowWatchlistUi, CustomWatchlistModalValidationInputs, CustomWatchlistFileExt } from 'models/CustomWatchlist.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { WithActionDescriptionBordered } from 'apps/ui/components/WithActionDescriptionBordered/WithActionDescriptionBordered';
import { useStyles, RoundedButton } from './CustomWatchlistModalValidationFileUploadForm.styles';
import * as api from '../../client/CustomWatchlist.client';
import { CSVSeparatorSelect } from '../CSVSeparatorSelect/CSVSeparatorSelect';
import { selectIsWatchlistsContentLoading } from '../../state/CustomWatchlist.selectors';

export function CustomWatchlistModalValidationFileUploadForm({ watchlist }: {
  watchlist?: FlowWatchlistUi;
}) {
  const intl = useIntl();
  const merchantId = useSelector(selectMerchantId);
  const isWatchlistsContentLoading = useSelector(selectIsWatchlistsContentLoading);
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>(watchlist?.process?.inputSourceFileName);
  const { setValue, setError, formState: { errors } } = useFormContext();

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
    try {
      const { data } = await api.uploadMerchantWatchlist(merchantId, form);
      console.log(data);
      setValue(CustomWatchlistModalValidationInputs.FileUrl, data.publicUrl);
      setError(CustomWatchlistModalValidationInputs.FileUrl, {});
    } catch {
      setError(CustomWatchlistModalValidationInputs.FileUrl, {
        message: intl.formatMessage({ id: 'CustomWatchlist.settings.watchlist.fileErrorUpload' }),
      });
    }
  }, [merchantId, intl, setValue, setError]);

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
          {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.label.title' })}
        </Typography>
        <Typography variant="body1" className={classes.colorGrey}>
          {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.label.subTitle' })}
        </Typography>
      </InputLabel>
      {fileName ? (
        <WithActionDescriptionBordered description={fileName} error={errors[CustomWatchlistModalValidationInputs.FileUrl]?.message}>
          <FileUploadButton
            onChange={handleUploadFile}
            accept=".csv"
            renderButton={(
              <RoundedButton>
                {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.reload' })}
              </RoundedButton>
            )}
          />
        </WithActionDescriptionBordered>
      ) : (
        <FileUploadButton onChange={handleUploadFile} accept=".csv" isPrefixIconDisplayed={!isWatchlistsContentLoading} disabled={isWatchlistsContentLoading}>
          {isWatchlistsContentLoading && <CircularProgress color="inherit" size={17} />}
          {!isWatchlistsContentLoading && intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile' })}
        </FileUploadButton>
      )}
      {extFile === CustomWatchlistFileExt.Csv && <CSVSeparatorSelect />}
    </>
  );
}
