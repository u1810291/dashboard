import { Box, Button, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styles from './Modal.module.scss';

export default function Modal({ children, onClose, className, imgSrc, title, subtitle, small = false, wideHeader = false, ...props }) {
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div
      className={classNames(styles.window, className, { small })}
      data-role="modal"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      <Button className={styles.btnClose} onClick={closeModal} />
      <Box className={wideHeader && styles.wideHeader}>
        {imgSrc && (
          <Box mb={2} align="center">
            <Grid container alignItems="center" justify="center" className={styles.img}>
              <img src={imgSrc} alt="" />
            </Grid>
          </Box>
        )}
        <Box align="center" className={styles.titleWrapper}>
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

Modal.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  small: PropTypes.bool,
  wideHeader: PropTypes.bool,
};

Modal.defaultProps = {
  imgSrc: '',
  title: '',
  subtitle: '',
  small: false,
  wideHeader: false,
};
