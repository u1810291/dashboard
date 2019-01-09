import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Content } from 'src/components/application-box'
import Panel from 'src/components/panel'
import classNames from 'classnames'
import { passwordRecovery } from 'src/state/auth'
import AccountInfo from './AccountInfo'
import CSS from './AccountSettings.css'
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
      <Content>
        <div className="container">
          <div className="row">
            <div className={classNames(CSS.block, 'X12 S6')}>
              <Panel caption={this.props.intl.formatMessage({ id: 'accountSettings.accountInfo' })}>
                <Panel.Body>
                  <AccountInfo />
                </Panel.Body>
              </Panel>
            </div>
            <div className={classNames(CSS.block, 'X12 S6')}>
              <Panel caption={this.props.intl.formatMessage({ id: 'accountSettings.team' })}>
                <Panel.Body>
                  <Team />
                </Panel.Body>
              </Panel>
            </div>
          </div>
        </div>
      </Content>
    )
  }
}
