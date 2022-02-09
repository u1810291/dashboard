import React, { InputHTMLAttributes } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { useStyles } from './FileSelectButton.styles';

export const FileSelectButton = ({
  children,
  inputProps = {
    id: 'file-load',
  },
  isPrefixIconDisplayed = true,
  disabled,
  onChange,
  error,
  accept,
  renderButton,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPrefixIconDisplayed?: boolean;
  disabled?: boolean;
  error?: string;
  children?: React.ReactNode;
  accept?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  renderButton?: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <div>
      <input
        type="file"
        hidden
        {...inputProps}
        accept={accept}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={inputProps.id}>
        {renderButton || (
          <ButtonStyled
            variant="outlined"
            component="span"
            fullWidth
            color="primary"
            size="large"
            disabled={disabled}
          >
            {isPrefixIconDisplayed && <FiPlus size={12} />}
            {children}
          </ButtonStyled>
        )}
      </label>
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};
