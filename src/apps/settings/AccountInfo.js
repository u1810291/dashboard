import React from 'react'
import { connect } from 'react-redux'
import AccountForm from 'src/fragments/signup/account-form'

export default
@connect(
  () => ({
    initialValues: null
  }),
  null
)
class AccountInfo extends React.Component {
  onSubmit = data => {}

  render() {
    return (
      <React.Fragment>
        <AccountForm
          onSubmit={this.onSubmit}
          initialValues={this.props.initialValues}
        />
      </React.Fragment>
    )
  }
}
