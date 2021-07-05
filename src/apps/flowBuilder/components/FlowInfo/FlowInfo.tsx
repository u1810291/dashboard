import { Box, Grid, ListItemIcon } from '@material-ui/core';
import { EditableField } from 'apps/oldProduct/components/EditableField/EditableField';
import { DateFormat, formatDate } from 'lib/date';
import React, { Dispatch, SetStateAction } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectFlowBuilderChangeableFlow } from '../../store/FlowBuilder.selectors';

export function FlowInfo({ canEdit, isEditable, newFlowName, setIsEditable, onSubmit, onCancel, validator }: {
  canEdit?: boolean;
  isEditable?: boolean;
  newFlowName?: string;
  setIsEditable?: Dispatch<SetStateAction<boolean>>;
  onSubmit?: (text: string) => void;
  onCancel?: () => void;
  validator?: (text: string) => void;
}) {
  const intl = useIntl();
  const { name, createdAt } = useSelector(selectFlowBuilderChangeableFlow);

  return (
    <Box>
      <Box color="common.black90" fontSize={24} mb={0.5}>
        {canEdit ? (
          <Grid container>
            <EditableField
              enabled={isEditable}
              setEditable={setIsEditable}
              submitEditable={onSubmit}
              cancelEditable={onCancel}
              validator={validator}
              value={newFlowName}
            />
            {!isEditable && (
              <ListItemIcon onClick={() => setIsEditable((prevState: boolean) => !prevState)}>
                <FiEdit3 />
              </ListItemIcon>
            )}
          </Grid>
        ) : name}
      </Box>
      <Grid container alignItems="center">
        <Box color="common.black75">
          {`${intl.formatMessage({ id: 'FlowBuilder.info.createdOn' })} ${formatDate(createdAt, DateFormat.MonthShortSpaced)}`}
        </Box>
      </Grid>
    </Box>
  );
}
