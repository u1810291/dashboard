import { Box, Button, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { QATags } from 'models/QA.model';
import styles from './Modal.module.scss';
import { overlayClose } from '../../state/overlay.actions';

export function Modal({ children, onClose, className, imgSrc = '', title = '', subtitle = '', description, small = false, wideHeader = false, customCloseIcon = null, ...props }: {
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  imgSrc?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  small?: boolean;
  wideHeader?: boolean;
  customCloseIcon?: React.ReactElement;
  [key: string]: any;
}) {
  const dispatch = useDispatch();
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose(); // this onClose will be called when you click on the closeButton (x)
    } else {
      dispatch(overlayClose());
    }
  }, [dispatch, onClose]);

  return (
    <div
      className={classNames(styles.window, className, { small })}
      data-role="modal"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {!customCloseIcon && <Button data-qa={QATags.Modal.CloseButton} className={styles.btnClose} onClick={closeModal} />}
      {customCloseIcon && React.cloneElement(customCloseIcon, { 'data-qa': QATags.Modal.CloseButton, onClick: closeModal })}
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
          {description}
        </Box>
      </Box>
      {children}
    </div>
  );
}
