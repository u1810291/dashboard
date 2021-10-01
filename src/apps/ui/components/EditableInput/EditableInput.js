import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { Box } from '@material-ui/core';
import { useStyles } from './EditableInput.styles';

export function EditableInput({ text, onSubmit, isEditingAllow = true }) {
  const [isEditing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  const inputRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (inputRef.current && isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  const handleBlur = useCallback(() => {
    if (inputText?.length === 0) {
      setInputText(text);
    }
    if (inputText !== text) {
      onSubmit(inputText);
    }
    setEditing(false);
  }, [inputText, text, onSubmit]);

  const handleKeyDown = useCallback((event) => {
    const { key } = event;
    const submitKeys = ['Tab', 'Enter'];

    if (key === 'Escape') {
      setEditing(false);
      setInputText(text);
    }
    if (submitKeys.indexOf(key) > -1) {
      handleBlur();
    }
  }, [text, handleBlur]);

  const handleOnChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const handleOnClick = useCallback(() => {
    if (isEditingAllow) {
      setEditing(true);
    }
  }, [isEditingAllow]);

  return (
    <Box>
      {isEditing ? (
        <Box
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            className={classes.input}
            onChange={handleOnChange}
          />
        </Box>
      ) : (
        <Box
          onClick={handleOnClick}
          className={classes.nameWrapper}
        >
          <span className={classes.name}>
            {inputText}
          </span>
          {isEditingAllow && <FiEdit3 className={classes.icon} />}
        </Box>
      )}
    </Box>
  );
}
