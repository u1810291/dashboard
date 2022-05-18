import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { EditableField } from 'apps/ui';
import { DateFormat, formatDate } from 'lib/date';
import React, { Dispatch, SetStateAction } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import { selectWorkflowBuilderChangeableFlow } from '../../store/WorkflowBuilder.selectors';
import { useStyles } from './FlowInfo.styles';

export function FlowInfo({ canEdit, isEditable, newFlowName, setIsEditable, onSubmit, onCancel, validator }: {
  canEdit?: boolean;
  isEditable?: boolean;
  newFlowName?: string;
  setIsEditable?: Dispatch<SetStateAction<boolean>>;
  onSubmit?: (text: string) => void;
  onCancel?: () => void;
  validator?: (text: string) => void;
}) {
  const { name, createdDate } = useSelector(selectWorkflowBuilderChangeableFlow);
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  return (
    <Box>
      <Box color="common.black90" fontSize={24} mb={0.5} className={classes.name}>
        {canEdit ? (
          <Grid container className={classes.field}>
            <EditableField
              enabled={isEditable}
              setEditable={setIsEditable}
              submitEditable={onSubmit}
              cancelEditable={onCancel}
              validator={validator}
              value={newFlowName}
            />
            {!isEditable && (
              <IconButton className={classes.button} onClick={() => setIsEditable((prevState: boolean) => !prevState)}>
                <FiEdit3 />
              </IconButton>
            )}
          </Grid>
        ) : name}
      </Box>
      <Grid container alignItems="center">
        <Box color="common.black75">
          {/* TODO: @vladislav.snimshchikov: why date is number? */}
          {`${formatMessage('FlowBuilder.info.createdOn')} ${formatDate(createdDate?.toString(), DateFormat.MonthShortWithSpace)}`}
        </Box>
      </Grid>
    </Box>
  );
}
