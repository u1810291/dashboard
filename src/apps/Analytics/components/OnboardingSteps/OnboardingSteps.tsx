import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { QATags } from 'models/QA.model';
import TableCell from '@material-ui/core/TableCell';
import { Routes } from 'models/Router.model';
import { useOverlay } from 'apps/overlay';
import { TemplatesModal } from 'apps/SolutionCatalog';
import { TeamInviteModal, selectCollaboratorStateIsPosting, collaboratorInvite } from 'apps/collaborators';
import { useFormatMessage } from 'apps/intl';
import { selectMerchantOnboarding, merchantUpdateOnboardingSteps, selectIsOwnerModel } from 'state/merchant';
import { templateChoose } from 'apps/Templates';
import { Loadable } from 'models/Loadable.model';
import { StartModal } from '../StartModal/StartModal';
import { StepsOptions, ONBOARDING, ONBOARDINGQA, AllStepsCompleted, OnboardingNames } from './model/OnboardingSteps.model';
import { useStyles, TableRowHovered } from './OnboardingSteps.styles';

export function OnboardingSteps() {
  const [createOverlay, closeOverlay] = useOverlay();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector<any, boolean>(selectCollaboratorStateIsPosting);
  const onboardingProgress = useSelector<any, StepsOptions[]>(selectMerchantOnboarding);
  const ownerModel = useSelector<any, Loadable<boolean>>(selectIsOwnerModel);
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const onboardingCompleted = AllStepsCompleted(onboardingProgress);

  const mockSteps = [
    { completed: false, stepId: 'read-our-docs' },
    { completed: false, stepId: 'invite-teammate' },
    { completed: false, stepId: 'make-metamap' },
  ];

  const stepsProgressChange = useCallback((currentStep: string) => {
    const progressChanges = [...onboardingProgress];
    const itemNumber = progressChanges.findIndex((step) => step.stepId === currentStep);
    if (itemNumber === -1) return;
    progressChanges[itemNumber] = { completed: true, stepId: currentStep };
    dispatch(merchantUpdateOnboardingSteps(mockSteps, currentStep, formatMessage));
  }, [onboardingProgress, dispatch, formatMessage]);

  const handleCardClick = useCallback((id: string) => {
    dispatch(templateChoose(id));
  }, [dispatch]);

  const handleTemplateModal = () => {
    closeOverlay();
    createOverlay(<TemplatesModal handleCardClick={handleCardClick} />);
  };

  const handleMetamapBuild = () => {
    history.push(Routes.flow.root, { dontShowModal: true });
    createOverlay(<StartModal action={handleTemplateModal} closeOverlay={closeOverlay} />);
  };

  const inviteModalOpen = (item: StepsOptions) => {
    history.push(Routes.settings.root);
    createOverlay(<TeamInviteModal
      onSubmit={(data) => {
        closeOverlay();
        dispatch(collaboratorInvite(formatMessage, data, item, stepsProgressChange));
      }}
      isPosting={state}
    />);
  };

  const readDocsComplete = (item: StepsOptions) => {
    window.open(process.env.REACT_APP_DOCS_URL);
    stepsProgressChange(item.stepId);
  };

  const buildFirstMetamapComplete = (item: StepsOptions) => !item.completed && handleMetamapBuild();

  const currentStepAction = (item) => {
    switch (item.stepId) {
      case OnboardingNames.docs:
        return readDocsComplete(item);
      case OnboardingNames.teammate:
        return !item.completed && inviteModalOpen(item);
      case OnboardingNames.metamap:
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
                  data-qa={QATags.Onboarding.Steps[ONBOARDINGQA[item.stepId]]}
                >
                  <TableCell>
                    <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color="common.black90">
                      <Box component="span">
                        <Box component="span" className={classes[item.completed ? 'completedStep' : 'incompletedStep']}>
                          &bull;&ensp;
                          <span>{formatMessage(ONBOARDING[item.stepId])}</span>
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
