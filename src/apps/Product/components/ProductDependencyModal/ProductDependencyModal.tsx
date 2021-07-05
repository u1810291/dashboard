import { Modal } from 'apps/overlay';
import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useStyles } from 'apps/Product/components/ProductDependencyModal/ProductDependencyModal.styles';

interface ProductDependencyModalProps {
  onClose: () => void;
  onConfirm: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftSubtitle?: React.ReactNode;
  rightSubtitle?: React.ReactNode;
  title?: React.ReactNode;
  confirmText?: React.ReactNode;
  variant?: 'Red';
}

export function ProductDependencyModal({ leftComponent, rightComponent, leftSubtitle, rightSubtitle, title, confirmText, variant, onConfirm, onClose }: ProductDependencyModalProps) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal className={classes.modal} onClose={onClose}>
      <>
        <Box mb={3} color="common.black90" fontWeight="bold">
          {title}
        </Box>
        <Grid container spacing={4}>
          <Grid container direction="column" wrap="nowrap" item xs={12} lg={6}>
            <Box color="common.black75" mb={1}>
              {leftSubtitle}
            </Box>
            <Grid container direction="column" wrap="nowrap" className={classes.wrapper}>
              {leftComponent}
            </Grid>
          </Grid>
          <Grid container direction="column" wrap="nowrap" item xs={12} lg={6}>
            <Box color="common.black75" mb={1}>
              {rightSubtitle}
            </Box>
            <Grid container direction="column" wrap="nowrap" className={classes.wrapper}>
              {rightComponent}
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.buttonsWrapper}>
            <Button onClick={onClose} variant="outlined" className={classNames(classes.button, classes.buttonCancel, classes[`buttonCancel${variant}`])}>
              <Box ml={1}>
                {intl.formatMessage({ id: 'cancel' })}
              </Box>
            </Button>
            <Button onClick={onConfirm} className={classNames(classes.button, classes.buttonSave, classes[`buttonSave${variant}`])}>
              {confirmText}
            </Button>
          </Grid>
        </Grid>
      </>
    </Modal>
  );
}
