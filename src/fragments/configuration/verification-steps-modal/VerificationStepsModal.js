import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'components/button';
import Items from 'components/items';
import Modal from 'components/modal';
import CheckboxGroup from 'components/checkbox-group';

export default class VerificationStepModal extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    onSave: PropTypes.func,
    values: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    items: [],
    onSave: () => {},
    values: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      values: props.values,
    };
  }

  render() {
    const { state: { values }, props } = this;
    const items = props.items.map((item) => ({
      label: <FormattedMessage id={`verification_items.${item}`} key={item} />,
      value: item,
    }));
    const { onSave } = this.props;
    return (
      <Modal>
        <main>
          <Items flow="row">
            <h1>
              <FormattedMessage id="fragments.configuration.verification_steps_modal.title" />
              <p>
                <FormattedMessage id="fragments.configuration.verification_steps_modal.subtitle" />
              </p>
            </h1>
            <CheckboxGroup
              items={items}
              values={values}
              onChange={(nextValues) => this.setState({ values: nextValues })}
            />
          </Items>
        </main>
        <footer>
          <Button
            buttonStyle="primary"
            disabled={!values.length}
            onClick={() => onSave(values)}
          >
            <FormattedMessage id="done" />
          </Button>
        </footer>
      </Modal>
    );
  }
}
