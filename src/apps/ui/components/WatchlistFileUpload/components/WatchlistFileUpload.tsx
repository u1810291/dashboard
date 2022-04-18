import React, { useState, useCallback, useMemo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { API_MEDIA_FIELD_NAME } from 'models/Media.model';
import { FormCsvSeparator, WithActionDescriptionBordered, FileSelectButton } from 'apps/ui';
import { useStyles, RoundedButton } from './WatchlistFileUpload.styles';
import { WatchlistApiCall, WatchlistFileExt, WatchlistFileUploadErrors } from '../models/WatchlistFileUpload';

export function WatchlistFileUpload({
  initialFileName,
  isFileAvailable,
  merchantId,
  csvSeparatorFieldName,
  errors,
  api,
  onFileSelect,
}: {
  initialFileName: string;
  isFileAvailable: boolean;
  csvSeparatorFieldName: string;
  merchantId: string;
  errors: WatchlistFileUploadErrors;
  api: WatchlistApiCall;
  onFileSelect: (valueFileName?: string) => void;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [isFileUploadLoading, setIsFileUploadLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>(initialFileName);
  const [file, setFile] = useState<File | null>(null);

  const handleUploadFile = useCallback(async () => {
    const form = new FormData();
    form.append(API_MEDIA_FIELD_NAME, file);
    setIsFileUploadLoading(true);
    try {
      const { data } = await api.callTo(merchantId, form);

      setIsFileUploadLoading(false);
      api.onSuccess(data);
    } catch (error: any) {
      setIsFileUploadLoading(false);
      api.onError(error);
    }
  }, [merchantId, api, file]);

  const handleSelectFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const eventFile = event.target.files[0];
    setFile(eventFile);
    setFileName(eventFile?.name);
    onFileSelect(eventFile?.name);
  }, [onFileSelect]);

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
          {formatMessage('Watchlist.settings.modal.button.uploadFile.label.title')}
        </Typography>
        <Typography variant="body1" className={classes.colorGrey}>
          {formatMessage('Watchlist.settings.modal.button.uploadFile.label.subTitle')}
        </Typography>
      </InputLabel>
      {fileName ? (
        <WithActionDescriptionBordered description={fileName} error={errors?.fileKey}>
          <FileSelectButton
            onChange={handleSelectFile}
            accept=".csv"
            renderButton={(
              <RoundedButton>
                {formatMessage('Watchlist.settings.modal.button.selectFile.reload')}
              </RoundedButton>
            )}
          />
        </WithActionDescriptionBordered>
      ) : (
        <FileSelectButton onChange={handleSelectFile} accept=".csv" isPrefixIconDisplayed={!isFileUploadLoading} disabled={isFileUploadLoading}>
          {formatMessage('Watchlist.settings.modal.button.selectFile')}
        </FileSelectButton>
      )}
      {extFile === WatchlistFileExt.Csv && (
        <FormCsvSeparator name={csvSeparatorFieldName} error={errors?.csvSeparator} />
      )}
      {fileName && (
        <>
          <Button
            className={classes.uploadButton}
            onClick={handleUploadFile}
            disabled={isFileUploadLoading || !file}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            {!isFileUploadLoading ? formatMessage('Watchlist.settings.modal.button.uploadFile') : <CircularProgress color="inherit" size={17} />}
          </Button>
          {(!file && isFileAvailable) && <span className={classes.uploadButtonHelper}>{formatMessage('Watchlist.settings.modal.button.uploadFile.helper')}</span>}
          {(!file && !isFileAvailable) && <span className={classes.error}>{formatMessage('Watchlist.settings.modal.button.uploadFile.error')}</span>}
        </>
      )}
    </>
  );
}
