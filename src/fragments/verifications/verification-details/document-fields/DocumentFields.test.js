import React from 'react'
import { shallow } from 'enzyme'
import DocumentFields from '.'

describe('DocumentFields', () => {
  test('Empty fields', () => {
    const component = shallow(<DocumentFields fields={[]} />)
    expect(component).toMatchSnapshot()
  })

  test('With editable fields', () => {
    const component = shallow(
      <DocumentFields
        fields={[
          {
            caption: 'Document field caption',
            value: 'Value',
            status: 'success',
            editable: true,
            id: 'FIELD_ID',
            docId: 'DOC_ID'
          }
        ]}
      />
    )
    expect(component).toMatchSnapshot()
  })

  test('With static fields', () => {
    const component = shallow(
      <DocumentFields
        fields={[
          {
            caption: 'Document field caption',
            value: 'Value',
            status: 'failure'
          }
        ]}
      />
    )
    expect(component).toMatchSnapshot()
  })
})
