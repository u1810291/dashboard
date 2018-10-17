import React from 'react'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'
import { times } from 'lodash'
import { Pager } from 'src/components/pager'
import { FormattedMessage } from 'react-intl'
import CSS from './Modal.css'

const STEPS_COUNT = 5
const IMAGES = times(STEPS_COUNT).map(index => require(`./step-${index}.png`))

export class OnboardingModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
  }
  setStep = step => {
    if (step === STEPS_COUNT) {
      this.props.onClose()
    } else {
      this.setState({ step })
    }
  }

  render() {
    return (
      <Modal onClose={this.props.onClose}>
        <div className={CSS.modalContainer}>
          <img
            src={IMAGES[this.state.step]}
            alt=""
            onClick={() => this.setStep(this.state.step + 1)}
          />
          <label>
            <FormattedMessage id={`onboarding-modal.messages.step-${this.state.step}`} />
          </label>
          <footer>
            <Button
              buttonStyle="no-borders default text-secondary"
              className="close-button"
              onClick={this.props.onClose}
            >
              <FormattedMessage id="onboarding-modal.close" />
            </Button>
            <Pager count={STEPS_COUNT} active={this.state.step} onClick={this.setStep} />
            <Button buttonStyle="primary" onClick={() => this.setStep(this.state.step + 1)}>
              <FormattedMessage id="onboarding-modal.next" />
            </Button>
          </footer>
        </div>
      </Modal>
    )
  }
}
