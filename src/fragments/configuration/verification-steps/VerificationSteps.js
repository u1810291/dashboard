import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { difference, without } from 'lodash'
import Icons from 'components/icons'
import Button from 'components/button'
import Text from 'components/text'
import Items from 'components/items'
import Select from 'react-select'
import { createOverlay, closeOverlay } from 'components/overlay'
import confirm from 'components/confirm'
import VerificationStepModal from '../verification-steps-modal'
import CSS from './VerificationSteps.module.scss'

export function removeItem(steps, index) {
  const updatedSteps = [...steps]
  updatedSteps.splice(index, 1)
  return updatedSteps
}

export function replaceItem(steps, index, values) {
  const updatedSteps = [...steps]
  updatedSteps[index] = values
  return updatedSteps
}

export function addItem(steps, values) {
  const updatedSteps = [...steps]
  updatedSteps.push(values)
  return updatedSteps
}

export function accessibleItems(available, mandatory, steps, index) {
  return difference(available, mandatory, ...without(steps, steps[index]))
}

const verificationStep =  function VerificationSteps({
  intl,
  steps = [],
  availableDocumentTypes = [],
  mandatoryDocumentTypes = [],
  patterns = {},
  onChange = () => {}
}) {
  const onRemoveItem = index => {
    confirm(<FormattedMessage id="confirm_string" />).then(() =>
      onChange({ verificationSteps: removeItem(steps, index) })
    )
  }

  const biometricOptions = [
    {
      label: intl.formatMessage({
        id: 'flow.biometricStep.none'
      }),
      value: 'none'
    },
    {
      label: intl.formatMessage({
        id: 'flow.biometricStep.selfie'
      }),
      value: 'selfie'
    },
    {
      label: intl.formatMessage({
        id: 'flow.biometricStep.liveness'
      }),
      value: 'liveness'
    },
  ];

  const onEditItem = index => {
    createOverlay(
      <VerificationStepModal
        values={index !== undefined ? steps[index] : []}
        items={accessibleItems(
          availableDocumentTypes,
          mandatoryDocumentTypes,
          steps,
          index
        )}
        onSave={values => {
          closeOverlay()
          onChange({
            verificationSteps:
              index !== undefined
                ? replaceItem(steps, index, values)
                : addItem(steps, values)
          })
        }}
      />
    )
  }

  return (
    <fieldset className="mgi-fieldset">
      <legend>
        <h3>
          <FormattedMessage id="flow.documentTypeStep.title" />
        </h3>
      </legend>
      {mandatoryDocumentTypes.map((doc, index) => (
        <fieldset className="mgi-fieldset" key={index}>
          <legend className="text-active">
            <FormattedMessage id="flow.documentTypeStep.stepNo" /> {index + 1}
          </legend>
          <Items templateColumns="minmax(auto, 100%) auto" justifyContent="start">
            <FormattedMessage id={`flow.documentTypeStep.${doc}`} />
            <span className="text-secondary">
              <FormattedMessage id="required" />
            </span>
          </Items>
        </fieldset>
      ))}
      {steps.map((step, index) => (
        <fieldset
          className="mgi-fieldset"
          key={index}
          data-role="verificationStep"
        >
          <legend className="text-active">
            <Items templateColumns="minmax(auto, 100%) auto">
              <span>
                <FormattedMessage id="flow.documentTypeStep.stepNo" />{' '}
                {index + mandatoryDocumentTypes.length + 1}
              </span>
              <Items inline gap={1} align="center">
                <Button buttonStyle="invisible">
                  <Icons.Pencil
                    className="svg-active"
                    onClick={onEditItem.bind(this, index)}
                  />
                </Button>
                <Button
                  buttonStyle="invisible"
                  data-role="deleteVerificationStep"
                >
                  <Icons.TrashBin
                    className="svg-error"
                    onClick={onRemoveItem.bind(this, index)}
                  />
                </Button>
              </Items>
            </Items>
          </legend>
          {step.sort().map((doc, docIndex) => (
            <React.Fragment key={doc}>
              <div>
                <FormattedMessage id={`flow.documentTypeStep.${doc}`} />
              </div>
              {docIndex < step.length - 1 && (
                <div className="text-secondary">
                  <FormattedMessage id="or" />
                </div>
              )}
            </React.Fragment>
          ))}
        </fieldset>
      ))}
      <Button
        buttonStyle="primary"
        onClick={() => onEditItem()}
        disabled={
          difference(availableDocumentTypes, mandatoryDocumentTypes, ...steps)
            .length === 0
        }
        data-role="newVerificationStep"
      >
        <FormattedMessage id="flow.documentTypeStep.button.title" />
      </Button>
      <legend className={CSS.marginBlock}>
        <Text lineHeight="2" weight="4">
          <FormattedMessage id="flow.documentTypeStep.biometric" />
        </Text>
        <div className={CSS.marginLeft}>
          <Select
            options={biometricOptions}
            value={biometricOptions.find(option => option.value === patterns.biometrics)}
            onChange={({value}) => {
              onChange({
                verificationPatterns: { ...patterns, biometrics: value }
              })
            }}
          />
        </div>
      </legend>
    </fieldset>
  )
}

export default injectIntl(verificationStep);