import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { ProgressSteps, Button } from 'mgi-ui-components'
import { DocumentTypeStep, ButtonColorStep, ButtonLanguageStep, GlobalWatchlistStep } from './steps'
import CSS from './ConfigureFlow.css'

function Pagination({ step, length, onClick }) {
  return (
    <div className={CSS.paginator}>
      <Button
        onClick={() => onClick(step - 1)}
        buttonStyle="no-borders primary icon-left"
        className={classNames({ [CSS.hidden]: step === 0 })}
      >
        <i>←</i>
        <FormattedMessage id="flow.prev" />
      </Button>
      <ProgressSteps stepsNum={length} step={step} onClick={onClick} />
      <Button
        onClick={() => onClick(step + 1)}
        buttonStyle="no-borders primary icon-right"
        className={classNames({ [CSS.hidden]: step === length - 1 })}
      >
        <FormattedMessage id="flow.next" />
        <i>→</i>
      </Button>
    </div>
  )
}

export default class ConfigureFlow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0
    }
  }

  handleStepChange = currentStep => {
    this.setState({ currentStep })
  }

  render() {
    const steps = [
      <DocumentTypeStep
        availableDocumentTypes={this.props.availableDocumentTypes}
        documents={this.props.documents}
        onClick={this.props.updateConfiguration}
      />,
      <ButtonColorStep
        availableButtonColors={this.props.availableButtonColors}
        color={this.props.color}
        onClick={this.props.updateConfiguration}
      />,
      <ButtonLanguageStep
        availableLanguages={this.props.availableLanguages}
        language={this.props.language}
        onClick={this.props.updateConfiguration}
      />,
      <GlobalWatchlistStep
        globalWatchList={this.props.globalWatchList}
        onClick={this.props.updateConfiguration}
      />
    ]
    return (
      <div>
        {steps[this.state.currentStep]}
        <Pagination
          step={this.state.currentStep}
          length={steps.length}
          onClick={this.handleStepChange}
        />
      </div>
    )
  }
}
