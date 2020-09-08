import classNames from 'classnames';
import Button from 'components/button';
import TextField from 'components/text-field';
import TextFieldCSS from 'components/text-field/TextField.module.css';
import { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PageLoader } from 'apps/layout';
import { ReactComponent as EditIcon } from './icon-edit.svg';
import CSS from './TextEditable.module.css';

const DataWasntExtracted = () => <FormattedMessage id="DocumentReadingStep.notParsed" />;

export default class TextEditable extends React.Component {
  static defaultProps = {
    error: false,
    inputClassName: '',
    isEditing: false,
    isLoading: false,
    isValid: true,
    onSubmit: () => {},
    text: '',
    textClassName: '',
  }

  static propTypes = {
    error: PropTypes.bool,
    inputClassName: PropTypes.string,
    isEditing: PropTypes.bool,
    isLoading: PropTypes.bool,
    isValid: PropTypes.bool,
    onSubmit: PropTypes.func,
    text: PropTypes.string,
    textClassName: PropTypes.string,
  }

  constructor(props) {
    super(props);
    const { text, isEditing } = this.props;
    this.state = {
      isEditing,
      savedText: text,
      editingText: text,
      doNotBlur: false,
    };
  }

  onMouseEnter = () => {
    this.setState({ doNotBlur: true });
  }

  onMouseLeave = () => {
    this.setState({ doNotBlur: false });
  }

  onBlur = () => {
    if (this.state.doNotBlur) {
      return;
    }
    this.onSubmit();
  }

  onFocus = () => {
    this.setState({ isEditing: true });
  }

  onChange = (e) => {
    this.setState({ editingText: e.target.value });
  }

  onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter') {
      this.onSubmit();
      e.stopPropagation();
    }
  }

  onSubmit = () => {
    this.setState((state) => ({
      savedText: state.editingText,
      isEditing: false,
    }));
    if (this.state.savedText !== this.state.editingText && this.props.onSubmit) {
      this.props.onSubmit(this.state.editingText);
    }
  }

  render() {
    const {
      props: {
        className,
        error,
        inputClassName,
        textClassName,
        isLoading,
        text,
        isValid,
        ...options
      },
      state: {
        isEditing,
        editingText,
        savedText,
      },
    } = this;

    const inputOptions = omit(options, ['isEditing']);

    if (isEditing) {
      return (
        <div className={className}>
          <div
            className={CSS.inputWrapper}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <TextField
              className={classNames(CSS.textEditable, inputClassName)}
              type="text"
              value={editingText}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              autoFocus
              {...inputOptions} // eslint-disable-line react/jsx-props-no-spreading
            />
            <div>
              <Button
                buttonStyle="primary"
                className={CSS.okButton}
                onClick={this.onSubmit}
              >
                <FormattedMessage id="ok" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <div
          className={classNames(
            TextFieldCSS.textField,
            CSS.textWrapper,
            textClassName,
          )}
          onClick={this.onFocus}
          onKeyUp={() => {}}
          role="button"
          tabIndex="0"
        >
          <span className={classNames({ 'color-red': !isValid })}>
            {(error ? text : savedText) || (
              <span className="color-red">
                <DataWasntExtracted />
              </span>
            ) }
          </span>
          {isLoading ? <PageLoader /> : <EditIcon className={CSS.editIcon} />}
        </div>
      </div>
    );
  }
}
