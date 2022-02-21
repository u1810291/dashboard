import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { QATags } from 'models/QA.model';
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
import { selectMerchantOnboarding, merchantUpdateOnboardingSteps } from 'state/merchant';
import { getTemplate } from 'apps/Templates';
import { StartModal } from '../StartModal/StartModal';
import { StepsOptions, OnboardingSteps, OnboardingQA, AllStepsCompleted } from './model/StepsCheckboxes.model';
import { useStyles, TableRowHovered } from './StepsCheckboxes.styles';

export function StepsCheckboxes() {
  const [createOverlay, closeOverlay] = useOverlay();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(selectCollaboratorState);
  const onboardingProgress: StepsOptions[] = useSelector(selectMerchantOnboarding);
  const [showStepsCompleted, setShowStepsCompleted] = useState<boolean>(false);
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const onboardingCompleted = AllStepsCompleted(onboardingProgress);

  useEffect(() => {
    if (showStepsCompleted) setTimeout(() => setShowStepsCompleted(false), 5000);
  }, [showStepsCompleted]);

  const stepsProgressChange = useCallback((item: StepsOptions) => {
    const progressChanges = [...onboardingProgress];
    const itemNumber = progressChanges.findIndex((step) => step.stepId === item.stepId);
    progressChanges[itemNumber] = { ...item, completed: true };
    dispatch(merchantUpdateOnboardingSteps(progressChanges, setShowStepsCompleted));
  }, [onboardingProgress]);

  const handleCardClick = async (id) => {
    try {
      await dispatch(getTemplate(id));
      history.push(`${Routes.templates.draftFlow}`);
      closeOverlay();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleTemplateModal = () => {
    closeOverlay();
    createOverlay(<TemplatesModal handleCardClick={handleCardClick} />);
  };

  const handleMetamapBuild = (item: StepsOptions) => {
    createOverlay(
      <Modal
        className={classes.startModal}
        title={formatMessage('StartModal.title')}
        subtitle={formatMessage('StartModal.subtitle')}
      >
        <StartModal action={handleTemplateModal} completeStep={() => stepsProgressChange(item)} closeOverlay={closeOverlay} />
      </Modal>,
    );
  };

  const handleInviteSubmit = (item: StepsOptions) => async (data) => {
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
      stepsProgressChange(item);
      notification.info(formatMessage('teamTable.inviteSuccess.description'));
    } catch (error) {
      notification.error(formatMessage(`Settings.teamSettings.submit.${error.response?.data?.name}`, { defaultMessage: formatMessage('Error.common') }));
      console.error(error);
    }
  };

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

  const buildFirstMetamapComplete = (item) => (item.completed ? history.push(Routes.flow.root) : handleMetamapBuild(item));

  const currentStepAction = (item) => {
    switch (item.stepId) {
      case 'read-our-docs':
        return readDocsComplete(item);
      case 'invite-teammate':
        return inviteModalOpen(item);
      case 'make-metamap':
        return buildFirstMetamapComplete(item);
      default:
        return console.error('no matches');
    }
  };

  return (
    <Box mb={2}>
      {
        showStepsCompleted && (
          <div className={classes.completedSteps}>
            You&apos;re all set!
            <span className={classes.blueSquare}>
              <FiCheck className={classes.checkIcon} />
            </span>
          </div>
        )
      }
      { (!showStepsCompleted && !onboardingCompleted)
        && (
        <Box>
          <Typography variant="h3">{formatMessage('StepsCheckboxes.title')}</Typography>
          <Table className={classes.table}>
            <TableBody>
              {onboardingProgress.map((item, idx) => (
                <TableRowHovered
                  hover
                  key={idx}
                  onClick={() => currentStepAction(item)}
                  data-qa={QATags.Onboarding.Steps[OnboardingQA[item.stepId]]}
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
                        <Box component="span" className={classes.itemName}>{formatMessage(OnboardingSteps[item.stepId])}</Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box mb={{ xs: 2, lg: 0 }}>
                      <Box component="span" className={classes.arrowContainer}>
                        { item.completed && <span className={classes.completed}>{formatMessage('StepsCheckboxes.completed')}</span> }
                        <span className={classes.arrow} />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRowHovered>
              ))}
            </TableBody>
          </Table>
        </Box>
        )}
    </Box>
  );
}
