import React, { useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { QATags } from 'models/QA.model';
import EditIcon from 'assets/text-field-edit-adornment.svg';
import { useStyles } from './TextFieldEditAdornment.styles';

interface ITextFieldEditAdornment {
  onSave: () => void;
  onCancel: () => void;
  isEditable: boolean;
  [x: string]: any;
}

export const TextFieldEditAdornment = React.forwardRef(({ onSave, onCancel, isEditable, ...props }: ITextFieldEditAdornment, ref) => {
  const classes = useStyles();
  const { value } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleIsEdit = useCallback(() => setIsEdit((prev) => !prev), []);

  const handleSave = useCallback(() => {
    onSave();
    toggleIsEdit();
  }, [onSave, toggleIsEdit]);

  const handleCancel = useCallback(() => {
    onCancel();
    toggleIsEdit();
  }, [onCancel, toggleIsEdit]);

  const adornment = useMemo(() => {
    if (isEdit) {
      return (
        <>
          <IconButton
            className={classes.iconButton}
            aria-label="save button"
            edge="end"
            onClick={handleSave}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            aria-label="close button"
            edge="end"
            onClick={handleCancel}
          >
            <CloseIcon />
          </IconButton>
        </>
      );
    }

    return (
      <IconButton
        className={classes.iconButton}
        aria-label="toggle edit status"
        edge="end"
        onClick={toggleIsEdit}
      >
        {value ? <Icon component="img" src={EditIcon} /> : <AddCircleOutline />}
      </IconButton>
    );
  }, [isEdit, classes.iconButton, value, toggleIsEdit, handleSave, handleCancel]);

  return (
    <TextField
      {...props}
      variant="outlined"
      className={classnames(classes.input, {
        [classes.viewMode]: !isEditable,
      })}
      ref={ref as any}
      disabled={!isEdit}
      InputProps={{
        inputProps: {
          'data-qa': QATags.Webhook.Secret,
          maxlength: 1024,
          maxRows: 8,
        },
        classes: {
          adornedEnd: classes.adornment,
        },
        endAdornment: isEditable && (
          <InputAdornment position="end" className={classes.adornmentRoot}>
            {adornment}
          </InputAdornment>
        ),
      }}
    />
  );
});
