/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FormattedMessage } from 'react-intl'
import { Items, Text } from 'components'
import Button from 'components/button'

import WithAsideModal from '../with-aside-modal'

import CSS from './PlanCancelModal.module.scss'

function PlanCancelModal({ onSubmit }) {
  return (
    <WithAsideModal>
      <Items flow="row">
        <Items flow="row" gap={0}>
          <Items flow="row">
            <Text weight={4} size={4.5} className={CSS.title}>
              <FormattedMessage id="PlanCancelModal.title" />
            </Text>
            <Text size={1.5} className={CSS.text}>
              <FormattedMessage id="PlanCancelModal.text" />
            </Text>
          </Items>
          <Items flow="row">
            <Button buttonStyle="primary" onClick={onSubmit}>
              <FormattedMessage id="PlanCancelModal.submit" />
            </Button>
          </Items>
        </Items>
      </Items>
    </WithAsideModal>
  )
}
export default PlanCancelModal
