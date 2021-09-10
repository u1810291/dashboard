import React, { InputHTMLAttributes } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button } from '@material-ui/core';

export const FileUploadButton = ({
  children,
  inputProps = {
    id: 'file-load',
  },
  accept,
  onChange,
  renderButton,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  accept?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  renderButton?: React.ReactNode;
}) => (
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
        <Button
          variant="outlined"
          component="span"
          fullWidth
          color="primary"
          size="large"
        >
          <FiPlus size={12} />
          {children}
        </Button>
      )}
    </label>
  </div>
);
