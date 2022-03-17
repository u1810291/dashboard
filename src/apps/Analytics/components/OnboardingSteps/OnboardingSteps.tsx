import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { QATags } from 'models/QA.model';
import TableCell from '@material-ui/core/TableCell';
import { Routes } from 'models/Router.model';
import { notification } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import { TemplatesModal } from 'apps/SolutionCatalog';
import { TeamInviteModal } from 'apps/collaborators/components/TeamInviteModal/TeamInviteModal';
import { useFormatMessage } from 'apps/intl';
import { selectCollaboratorState } from 'apps/collaborators/state/collaborator.selectors';
import { collaboratorAdd } from 'apps/collaborators/state/collaborator.actions';
import { selectMerchantOnboarding, merchantUpdateOnboardingSteps, selectIsOwnerModel } from 'state/merchant';
import { getTemplate } from 'apps/Templates';
import { Loadable } from 'models/Loadable.model';
import { StartModal } from '../StartModal/StartModal';
import { StepsOptions, Onboarding, OnboardingQA, AllStepsCompleted } from './model/OnboardingSteps.model';
import { useStyles, TableRowHovered } from './OnboardingSteps.styles';

export function OnboardingSteps() {
  const [createOverlay, closeOverlay] = useOverlay();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(selectCollaboratorState);
  const onboardingProgress = useSelector<any, StepsOptions[]>(selectMerchantOnboarding);
  const ownerModel = useSelector<any, Loadable<boolean>>(selectIsOwnerModel);
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const onboardingCompleted = AllStepsCompleted(onboardingProgress);

  const stepsProgressChange = (currentStep: string) => {
    const progressChanges = [...onboardingProgress];
    const itemNumber = progressChanges.findIndex((step) => step.stepId === currentStep);
    progressChanges[itemNumber] = { completed: true, stepId: currentStep };
    dispatch(merchantUpdateOnboardingSteps(progressChanges, currentStep, formatMessage));
  };

  const handleCardClick = async (id: string) => {
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

  const handleMetamapBuild = () => {
    history.push(`${Routes.flow.root}`, { dontShowModal: true });
    createOverlay(<StartModal action={handleTemplateModal} closeOverlay={closeOverlay} />);
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
      stepsProgressChange(item.stepId);
      notification.info(formatMessage('teamTable.inviteSuccess.description'));
    } catch (error) {
      notification.error(formatMessage(`Settings.teamSettings.submit.${error.response?.data?.name}`, { defaultMessage: formatMessage('Error.common') }));
      console.error(error);
    }
  };

  const inviteModalOpen = (item: StepsOptions) => {
    history.push(`${Routes.settings.root}`);
    createOverlay(<TeamInviteModal
      onSubmit={handleInviteSubmit(item)}
      isPosting={state.isPosting}
    />);
  };

  const readDocsComplete = (item) => {
    window.open('https://docs.metamap.com', '_blank');
    stepsProgressChange(item.stepId);
  };

  const buildFirstMetamapComplete = (item) => !item.completed && handleMetamapBuild();

  const currentStepAction = (item) => {
    switch (item.stepId) {
      case 'read-our-docs':
        return !item.completed && readDocsComplete(item);
      case 'invite-teammate':
        return !item.completed && inviteModalOpen(item);
      case 'make-metamap':
        return buildFirstMetamapComplete(item);
      default:
        return console.error('no matches');
    }
  };

  return (
    <Box mb={2}>
      { (!onboardingCompleted && ownerModel.value)
        && (
        <Box>
          <Typography variant="h3">{formatMessage('Onboarding.title')}</Typography>
          <Table className={classes.table}>
            <TableBody>
              {onboardingProgress.map((item, idx) => (
                <TableRowHovered
                  hover
                  key={idx}
                  className={classes.itemRow}
                  onClick={() => currentStepAction(item)}
                  data-qa={QATags.Onboarding.Steps[OnboardingQA[item.stepId]]}
                >
                  <TableCell>
                    <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color="common.black90">
                      <Box component="span">
                        <Box component="span" className={classes[item.completed ? 'completedStep' : 'incompletedStep']}>
                          &bull;&ensp;
                          <span>{formatMessage(Onboarding[item.stepId])}</span>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box mb={{ xs: 2, lg: 0 }}>
                      <Box component="span" className={classes.arrowContainer}>
                        { item.completed && <span className={classes.completed}>{formatMessage('Onboarding.completed')}</span> }
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
