import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { Routes } from 'models/Router.model';
import { notification } from 'apps/ui';
import { Modal, useOverlay } from 'apps/overlay';
import { TemplatesModal } from 'apps/SolutionCatalog';
import { TeamInviteModal } from 'apps/collaborators/components/TeamInviteModal/TeamInviteModal';
import { useFormatMessage } from 'apps/intl';
import { selectCollaboratorState } from 'apps/collaborators/state/collaborator.selectors';
import { collaboratorAdd } from 'apps/collaborators/state/collaborator.actions';
import { StartModal } from '../StartModal/StartModal';
import { MOCK_STEPS, StepsOptions } from './model/StepsCheckboxes.model';
import { useStyles, TableRowHovered } from './StepsCheckboxes.styles';

export function StepsCheckboxes() {
  const [createOverlay, closeOverlay] = useOverlay();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(selectCollaboratorState);
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [currentProgress, setCurrentProgress] = useState<StepsOptions[]>(MOCK_STEPS);

  const handleTemplateModal = () => {
    closeOverlay();
    createOverlay(<TemplatesModal />);
  };

  const handleMetamapBuild = () => {
    createOverlay(
      <Modal
        className={classes.startModal}
        title={formatMessage('StartModal.title')}
        subtitle={formatMessage('StartModal.subtitle')}
      >
        <StartModal action={handleTemplateModal} />
      </Modal>,
    );
  };

  const stepsProgressChange = (item: StepsOptions) => {
    const progressChanges = [...currentProgress];
    const itemNumber = currentProgress.findIndex((step) => step.title === item.title);
    progressChanges[itemNumber] = { ...item, completed: true };
    setCurrentProgress(progressChanges);
  };

  const handleInviteSubmit = useCallback((item: StepsOptions) => async (data) => {
    closeOverlay();
    try {
      await dispatch(collaboratorAdd({
        role: parseInt(data.role, 10),
        user: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      }));
      notification.info(formatMessage('teamTable.inviteSuccess.description'));
      stepsProgressChange(item);
    } catch (error) {
      notification.error(formatMessage(`Settings.teamSettings.submit.${error.response?.data?.name}`, { defaultMessage: formatMessage('Error.common') }));
      console.error(error);
    }
  }, [dispatch, closeOverlay]);

  const inviteModalOpen = (item: StepsOptions) => {
    createOverlay(<TeamInviteModal
      onSubmit={handleInviteSubmit(item)}
      isPosting={state.isPosting}
    />);
  };

  const readDocsComplete = (item) => {
    window.open('https://docs.metamap.com', '_blank');
    stepsProgressChange(item);
  };

  // function changeTemplatesStepStatus(item) {
  //   handleMetamapBuild();
  //   stepsProgressChange(item);
  // }

  const buildFirstMetamapComplete = (item) => (item.completed ? history.push(Routes.flow.root) : handleMetamapBuild());

  const currentStepAction = (item) => {
    switch (item.title) {
      case 'Read our docs to learn  about MetaMap':
        return readDocsComplete(item);
      case 'Invite a teammate':
        return inviteModalOpen(item);
      case 'Build your first metamap':
        return buildFirstMetamapComplete(item);
      default:
        return console.error('no matches');
    }
  };

  return (
    <Box mb={2}>
      <Typography variant="h3">{formatMessage('StepsCheckboxes.title')}</Typography>
      <Table className={classes.table}>
        <TableBody>
          {currentProgress.map((item, idx) => (
            <TableRowHovered
              hover
              key={idx}
              onClick={() => currentStepAction(item)}
            >
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color="common.black90">
                  <Box component="span">
                    <Checkbox
                      color="primary"
                      checkedIcon={<CheckboxOn />}
                      icon={<CheckboxOff />}
                      checked={item.completed}
                    />
                    <Box component="span" className={classes.itemName}>{item.title}</Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box component="span" className={classes.arrowContainer}>
                    {
                      item.completed && <span className={classes.completed}>{formatMessage('StepsCheckboxes.completed')}</span>
                    }
                    <span className={classes.arrow} />
                  </Box>
                </Box>
              </TableCell>
            </TableRowHovered>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
