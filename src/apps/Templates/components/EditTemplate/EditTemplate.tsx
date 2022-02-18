import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { TemplateSaveModal } from 'apps/Templates/index';
import { QATags } from 'models/QA.model';
import { useFormatMessage } from 'apps/intl';
import React, { useCallback, useEffect } from 'react';
import { useOverlay } from 'apps/overlay';
import { useStyles } from './EditTemplate.styles';

export function EditTemplate() {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [createOverlay] = useOverlay();
  const editMode = true;

  const handleChangeFlow = () => {
    createOverlay(<TemplateSaveModal edit={editMode} />);
  };

  return (
    <Box>
      <Button
        className={classes.buttonEdit}
        color="primary"
        variant="contained"
        data-qa={QATags.FlowBuilder.EditButton}
        onClick={handleChangeFlow}
      >
        {formatMessage('FlowBuilder.button.edit')}
      </Button>
    </Box>
  );
}
