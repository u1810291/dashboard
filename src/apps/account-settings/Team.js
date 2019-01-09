import React from 'react'
import { connect } from 'react-redux'
import TeamTable from 'src/fragments/team-table'


export default
@connect(
  () => ({
    rows: [],
    teamName: ''
  }),
  null,
)
class Team extends React.Component {

  onInviteSubmit = (data) => {

  }

  onTeamNameChange = (teamName) => {

  }

  onDeleteSubmit = (userName) => {

  }

  onRoleChange = (userName, role) => {

  }

  render() {
    return (
      <React.Fragment>
        <TeamTable
          teamName={this.props.teamName}
          rows={this.props.rows}
          onTeamNameChange={this.onTeamNameChange}
          onRoleChange={this.onRoleChange}
          onInviteSubmit={this.onInviteSubmit}
          onDeleteSubmit={this.onDeleteSubmit}
        />
      </React.Fragment>
    )
  }
}
