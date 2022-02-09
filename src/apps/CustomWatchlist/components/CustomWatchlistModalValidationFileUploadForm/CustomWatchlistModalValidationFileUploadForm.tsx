import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { WithActionDescriptionBordered, FileSelectButton } from 'apps/ui';
import { selectCurrentCustomWatchlistIsFileAvailable, selectCurrentCustomWatchlistFileInfo } from '../../state/CustomWatchlist.selectors';
import { useStyles, RoundedButton } from './CustomWatchlistModalValidationFileUploadForm.styles';
import { CustomWatchlistModalValidationInputs, CustomWatchlistFileExt, CustomWatchlistUpload, IWatchlist } from '../../models/CustomWatchlist.models';
import * as api from '../../client/CustomWatchlist.client';
import { CSVSeparatorSelect } from '../CSVSeparatorSelect/CSVSeparatorSelect';
import { updateCurrentWatchlist } from '../../state/CustomWatchlist.actions';

export function CustomWatchlistModalValidationFileUploadForm({ watchlist, onFileUploaded }: {
  watchlist?: IWatchlist;
  onFileUploaded?: (data: CustomWatchlistUpload) => void;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const merchantId = useSelector(selectMerchantId);
  const isFileAvailable = useSelector(selectCurrentCustomWatchlistIsFileAvailable);
  const currentCustomWatchlistFileInfo = useSelector(selectCurrentCustomWatchlistFileInfo);
  const classes = useStyles();
  const [isFileUploadLoading, setIsFileUploadLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(watchlist?.process?.inputSourceFileName);
  const { setValue, setError, clearErrors, formState: { errors } } = useFormContext();

  const isEdit = !!watchlist;

  useEffect(() => {
    if (fileName) {
      setValue(CustomWatchlistModalValidationInputs.FileName, fileName);
    }
  }, [fileName, setValue]);

  const handleSelectFile = useCallback(async () => {
    const form = new FormData();
    form.append('media', file);
    onFileUploaded({
      key: null,
    });
    setIsFileUploadLoading(true);
    try {
      const { data } = await api.uploadMerchantWatchlist(merchantId, form);
      setValue(CustomWatchlistModalValidationInputs.FileKey, data.key);
      clearErrors(CustomWatchlistModalValidationInputs.FileKey);
      onFileUploaded(data);
      setIsFileUploadLoading(false);

      if (!isFileAvailable && isEdit) {
        dispatch(updateCurrentWatchlist({ isFileAvailable: true }));
      }
    } catch {
      setError(CustomWatchlistModalValidationInputs.FileKey, {
        message: formatMessage('CustomWatchlist.settings.watchlist.fileErrorUpload'),
      });
      setIsFileUploadLoading(false);
    }
  }, [merchantId, file, isFileAvailable, isEdit, formatMessage, setValue, clearErrors, onFileUploaded, setError, dispatch]);

  const handleUploadFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const eventFile = event.target.files[0];
    setFile(eventFile);
    setFileName(eventFile?.name);
  }, []);

  const extFile = useMemo(() => {
    const arr = fileName?.split('.') || [];
    if (arr?.length !== 0) {
      return arr[arr.length - 1];
    }

    return '';
  }, [fileName]);

  useEffect(() => {
    if (currentCustomWatchlistFileInfo?.fileKey && currentCustomWatchlistFileInfo?.fileName) {
      setValue(CustomWatchlistModalValidationInputs.FileKey, currentCustomWatchlistFileInfo.fileKey);
      setValue(CustomWatchlistModalValidationInputs.FileName, currentCustomWatchlistFileInfo.fileName);
    }
  }, [currentCustomWatchlistFileInfo, setValue]);

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
          <FileSelectButton
            onChange={handleUploadFile}
            accept=".csv"
            renderButton={(
              <RoundedButton>
                {formatMessage('CustomWatchlist.settings.modal.button.selectFile.reload')}
              </RoundedButton>
            )}
          />
        </WithActionDescriptionBordered>
      ) : (
        <FileSelectButton onChange={handleUploadFile} accept=".csv" isPrefixIconDisplayed={!isFileUploadLoading} disabled={isFileUploadLoading}>
          {formatMessage('CustomWatchlist.settings.modal.button.selectFile')}
        </FileSelectButton>
      )}
      {extFile === CustomWatchlistFileExt.Csv && <CSVSeparatorSelect defaultValue={watchlist?.process?.csvSeparator} />}
      {fileName && (
        <>
          <Button
            className={classes.uploadButton}
            onClick={handleSelectFile}
            disabled={isFileUploadLoading || !file}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            {!isFileUploadLoading ? formatMessage('CustomWatchlist.settings.modal.button.uploadFile') : <CircularProgress color="inherit" size={17} />}
          </Button>
          {(!file && isFileAvailable) && <span className={classes.uploadButtonHelper}>{formatMessage('CustomWatchlist.settings.modal.button.uploadFile.helper')}</span>}
          {(!file && !isFileAvailable) && <span className={classes.error}>{formatMessage('CustomWatchlist.settings.modal.button.uploadFile.error')}</span>}
        </>
      )}
    </>
  );
}
