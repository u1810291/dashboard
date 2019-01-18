import React from 'react'
import { shallow } from 'enzyme'
import VerificationStepsModal from '.'

describe('VerificationStepModal', () => {
  it('is disaled with empty values', () => {
    const props = {
      values: [],
      items: ['passport', 'national-id']
    }
    const component = shallow(<VerificationStepsModal {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('is enabled and has pre-checked values', () => {
    const props = {
      values: ['national-id'],
      items: ['passport', 'national-id']
    }
    const component = shallow(<VerificationStepsModal {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('sends values on save', () => {
    const props = {
      values: ['national-id'],
      items: ['passport', 'national-id'],
      onSave: jest.fn()
    }

    const component = shallow(<VerificationStepsModal {...props} />)

    component.find('Button').prop('onClick')()
    expect(props.onSave).toHaveBeenCalledWith(props.values)
  })
})
