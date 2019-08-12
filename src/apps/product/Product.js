import React, { useState } from 'react'
import classNames from 'classnames'
import { Content, Items } from 'components'
import Button from 'components/button'
import { FormattedMessage } from 'react-intl'
import Integration from 'apps/integration'
import { Configuration } from 'apps/configuration'

import CSS from './Product.module.scss'

export default function Product() {
  const [toggle, changeToggle] = useState(true)

  return (
    <Content>
      <div className={CSS.switcher}>
        <Button
          className={classNames([{
            [CSS.active]: !toggle,
          }, CSS.left])}
          buttonStyle={toggle ? 'primary' : 'active'}
          onClick={changeToggle.bind(this, true)}
        >
          <FormattedMessage id="Product.switcher.customization" />
        </Button>
        <Button
          className={classNames([{
            [CSS.active]: toggle,
          }, CSS.right])}
          buttonStyle={toggle ? 'active' : 'primary'}
          onClick={changeToggle.bind(this, false)}
        >
          <FormattedMessage id="Product.switcher.integration" />
        </Button>
      </div>
      {toggle && (
        <Items gap={12} padding={0} templateColumns="4fr 4fr">
          <Configuration />
        </Items>
      )}
      {!toggle && (
        <Integration />
      )}
    </Content>
  );
}
