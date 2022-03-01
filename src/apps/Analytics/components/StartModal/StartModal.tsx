import React from 'react';
import { Routes } from 'models/Router.model';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useFormatMessage } from 'apps/intl';
import { Modal } from 'apps/overlay';
import { ReactComponent as GuideModal } from '../../assets/guide_modal.svg';
import { useStyles } from './StartModal.styles';

export const StartModal = ({ action, closeOverlay }) => {
  const classes = useStyles();
  const history = useHistory();
  const formatMessage = useFormatMessage();
  return (
    <Modal
      className={classes.startModal}
      title={formatMessage('StartModal.title')}
      subtitle={formatMessage('StartModal.subtitle')}
    >
      <Container className={classes.container}>
        <Box>
          <GuideModal className={classes.svg} />
        </Box>
        <Box className={classes.buttonsGroup}>
          <Button
            className={classes.button}
            tabIndex={0}
            color="primary"
            variant="contained"
            onClick={action}
          >
            {formatMessage('StartModal.viewButton')}
          </Button>
          <Typography variant="body1">
            {formatMessage('StartModal.or')}
          </Typography>
          <Button
            tabIndex={0}
            color="primary"
            className={classes.button}
            variant="outlined"
            onClick={() => {
              history.push(Routes.templates.draftFlow);
              closeOverlay();
            }}
          >
            {formatMessage('StartModal.blankFlowButton')}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};
