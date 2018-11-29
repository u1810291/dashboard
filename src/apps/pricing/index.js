import React from 'react'
import { Content } from 'src/components/application-box'
import Pricing from './pricing'
import UpgradePlan from './UpgradePlan'

export default () => {
  return (
    <Content>
      <Pricing />
      <UpgradePlan />
    </Content>
  )
}
