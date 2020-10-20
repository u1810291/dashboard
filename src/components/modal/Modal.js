import { Box, Button, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styles from './Modal.module.scss';

export default function Modal({ children, onClose, className, imgSrc, title, subtitle, small = false, ...props }) {
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
      {imgSrc && (
        <Box mb={2} align="center">
          <Grid container alignItems="center" justify="center" className={styles.img}>
            <img src={imgSrc} alt="" />
          </Grid>
        </Box>
      )}
      {title && (
        <Typography variant="h4" gutterBottom align="center">
          {title}
        </Typography>
      )}
      {subtitle && (
        <Box align="center" className={styles.subtitle}>
          {subtitle}
        </Box>
      )}
      {children}
    </div>
  );
}

Modal.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  small: PropTypes.bool,
};

Modal.defaultProps = {
  imgSrc: '',
  title: '',
  subtitle: '',
  small: false,
};
