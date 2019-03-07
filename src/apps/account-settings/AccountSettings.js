import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Content } from 'src/components/application-box'
import classNames from 'classnames'
import { passwordRecovery } from 'src/state/auth'
// import AccountInfo from './AccountInfo'
import CSS from './AccountSettings.scss'
import Team from './Team'

export default
@connect(null, { passwordRecovery })
@injectIntl
@connect(
  state => ({ token: state.auth.token, configuration: state.merchant.configuration })
)
class AccountSettings extends React.Component {
  render() {
    return (
      <Content className={CSS.container}>
        {/*<div className={CSS.leftBlock}>*/}
          {/*<ul className={CSS.leftMenu}>*/}
            {/*<li><FormattedMessage id="accountSettings.personalSettings"/></li>*/}
            {/*<li className='active'><FormattedMessage id="accountSettings.teamSettings"/></li>*/}
            {/*<li><FormattedMessage id="accountSettings.webhookSettings"/></li>*/}
          {/*</ul>*/}
        {/*</div>*/}
        <div className={classNames(CSS.mainBlock)}>
          <h1>
            <FormattedMessage id="accountSettings.yourTeam" />
          </h1>
          <Team {...this.props}/>
        </div>
      </Content>
    )
  }
}
