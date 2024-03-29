import { Box, Grid, IconButton } from '@material-ui/core';
import { EditableField } from 'apps/ui';
import { DateFormat, formatDate } from 'lib/date';
import React, { Dispatch, SetStateAction } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useFormatMessage } from 'apps/intl';
import { useSelector } from 'react-redux';
import { IFlow } from 'models/Flow.model';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { selectFlowBuilderChangeableFlow } from '../../store/FlowBuilder.selectors';
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
  const formatMessage = useFormatMessage();
  const { id } = useParams();
  const currentFlowId = useSelector<any, IFlow>(selectCurrentFlow);
  const flowBuilderChangeableFlow = useSelector<any, IFlow>(selectFlowBuilderChangeableFlow);
  const { name, createdAt } = (!id || !currentFlowId) ? flowBuilderChangeableFlow : currentFlowId;
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
          {`${formatMessage('FlowBuilder.info.createdOn')} ${formatDate(createdAt, DateFormat.MonthShortWithSpace)}`}
        </Box>
      </Grid>
    </Box>
  );
}
