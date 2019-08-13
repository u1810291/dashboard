import React, { useState } from 'react'
import classNames from 'classnames'
import { Content, Items } from 'components'
import Button from 'components/button'
import { FormattedMessage } from 'react-intl'
import Integration from 'apps/integration'
import { Configuration } from 'apps/configuration'

import CSS from './Product.module.scss'

export default function Product() {
  const [toggle, changeToggle] = useState(false)

  return (
    <Content>
      <div className={CSS.switcher}>
        <Button
          className={classNames([{
            [CSS.active]: toggle,
          }, CSS.left])}
          buttonStyle={toggle ? 'active' : 'primary'}
          onClick={() => changeToggle(false)}
        >
          <FormattedMessage id="Product.switcher.customization" />
        </Button>
        <Button
          className={classNames([{
            [CSS.active]: !toggle,
          }, CSS.right])}
          buttonStyle={toggle ? 'primary' : 'active'}
          onClick={() => changeToggle(true)}
        >
          <FormattedMessage id="Product.switcher.integration" />
        </Button>
      </div>
      {!toggle && (
        <Items gap={12} padding={0} templateColumns="4fr 4fr">
          <Configuration goToIntegration={changeToggle} />
        </Items>
      )}
      {toggle && (
        <Integration />
      )}
    </Content>
  );
}
