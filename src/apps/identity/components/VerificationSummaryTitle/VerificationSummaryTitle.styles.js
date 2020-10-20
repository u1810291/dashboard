import { makeStyles } from '@material-ui/core';
import { StepStatus } from '../../../../models/Step.model';

export const useStyles = makeStyles((theme) => {
  const statuses = {
    [StepStatus.Success]: {
      colorText: theme.palette.common.black75,
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
      colorText: theme.palette.common.black75,
      colorIcon: theme.palette.common.black75,
    },
  };

  return ({
    titleWrapper: () => ({
      minHeight: 44,
      marginBottom: 20,
      padding: [[5, 20]],
      background: theme.palette.common.black7opacity,
      borderRadius: 5,
    }),
    title: ({ status }) => ({
      color: statuses[status].colorText,
      lineHeight: '1.1',
    }),
    titleIcon: ({ status }) => ({
      flexShrink: 0,
      marginRight: 10,
      color: statuses[status].colorIcon,
    }),
  });
});
