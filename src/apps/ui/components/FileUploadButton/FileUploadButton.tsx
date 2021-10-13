import React, { InputHTMLAttributes } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { useStyles } from './FileUploadButton.styles';

export const FileUploadButton = ({
  children,
  inputProps = {
    id: 'file-load',
  },
  onChange,
  error,
  accept,
  renderButton,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      />
      <label htmlFor="file-load">
        {renderButton || (
          <ButtonStyled
            variant="outlined"
            component="span"
            fullWidth
            color="primary"
            size="large"
          >
            <FiPlus size={12} />
            {children}
          </ButtonStyled>
        )}
      </label>
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};
