import { makeStyles } from '@material-ui/core';
import { StepStatus } from '../../../../models/Step.model';
import { LivenessStepStatus } from '../../../../models/Biometric.model';

export const useStyles = makeStyles((theme) => {
  const statuses = {
    [StepStatus.Success]: {
      colorText: theme.palette.text.main,
      colorIcon: theme.palette.common.green,
    },
    [StepStatus.Failure]: {
      colorText: theme.palette.common.red,
      colorIcon: theme.palette.common.red,
    },
    [StepStatus.Incomplete]: {
      colorText: theme.palette.common.yellow,
      colorIcon: theme.palette.common.yellow,
    },
    [StepStatus.Checking]: {
      colorText: theme.palette.text.main,
      colorIcon: theme.palette.text.main,
    },
    [LivenessStepStatus.Disabled]: {
      colorText: theme.palette.text.main,
      colorIcon: theme.palette.text.main,
    },
    [LivenessStepStatus.FewData]: {
      colorText: theme.palette.text.main,
      colorIcon: theme.palette.text.main,
    },
  };

  return ({
    titleWrapper: () => ({
      minHeight: 44,
      marginBottom: 20,
      padding: [[5, 20]],
      background: theme.palette.foreground.main,
      borderRadius: 5,
    }),
    title: ({ status }) => ({
      color: statuses[status].colorText,
      lineHeight: '1.2',
    }),
    titleIcon: ({ status }) => ({
      flexShrink: 0,
      marginRight: 10,
      color: statuses[status].colorIcon,
    }),
  });
});
