import { Box, Button, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Modal.module.scss';
import { overlayClose } from '../../state/overlay.actions';
import { QATags } from '../../../../models/QA.model';

export interface ModalProps{
  children?: React.ReactElement,
  onClose?: () => void,
  className?: string,
  imgSrc?: string,
  title?: string,
  subtitle?: string,
  small?: boolean,
  wideHeader?: boolean,
  [key: string]: any,
}

export function Modal({ children, onClose, className, imgSrc, title, subtitle, small = false, wideHeader = false, ...props }: ModalProps) {
  const dispatch = useDispatch();
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    dispatch(overlayClose());
  }, [dispatch, onClose]);

  return (
    <div
      className={classNames(styles.window, className, { small })}
      data-role="modal"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      <Button data-qa={QATags.Modal.CloseButton} className={styles.btnClose} onClick={closeModal} />
      <Box className={classNames({ [styles.wideHeader]: wideHeader })}>
        {imgSrc && (
          <Box mb={2}>
            <Grid container alignItems="center" justify="center" className={styles.img}>
              <img src={imgSrc} alt="" />
            </Grid>
          </Box>
        )}
        <Box className={styles.titleWrapper}>
          {title && (
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Box className={styles.subtitle}>
              {subtitle}
            </Box>
          )}
        </Box>
      </Box>
      {children}
    </div>
  );
}

Modal.defaultProps = {
  imgSrc: '',
  title: '',
  subtitle: '',
  small: false,
  wideHeader: false,
};