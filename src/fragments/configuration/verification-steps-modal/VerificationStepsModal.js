import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'src/components/button'
import { Modal } from 'src/components/modal'
import CheckboxGroup from 'src/components/checkbox-group'

export default class VerificationStepModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: props.values
    }
  }

  static defaultProps = {
    values: [],
    items: [],
    onSave: () => {}
  }

  render() {
    const { values } = this.state
    const items = this.props.items.map(item => ({
      label: <FormattedMessage id={`verification_items.${item}`} key={item} />,
      value: item
    }))
    const { onSave } = this.props
    return (
      <Modal>
        <main>
          <h1>
            <FormattedMessage id="fragments.configuration.verification_steps_modal.title" />
            <p>
              <FormattedMessage id="fragments.configuration.verification_steps_modal.subtitle" />
            </p>
          </h1>
          <CheckboxGroup
            items={items}
            values={values}
            onChange={values => this.setState({ values })}
          />
        </main>
        <footer className="mgi-items">
          <Button
            buttonStyle="primary"
            disabled={!this.state.values.length}
            onClick={() => onSave(values)}
          >
            <FormattedMessage id="done" />
          </Button>
        </footer>
      </Modal>
    )
  }
}
