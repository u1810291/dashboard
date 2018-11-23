import React from 'react'
import { connect } from 'react-redux'
import { flatten, uniq } from 'lodash'
import { getIdentities } from 'src/state/identities'
import { FormattedMessage } from 'react-intl'
import { AVAILABLE_DOCUMENT_TYPES } from 'src/state/merchant'
import { Content } from 'src/components/application-box'
import Panel from 'src/components/panel'
import Chart from 'src/components/chart'
import ChartLegendItem from 'src/components/chart/legend-item'
import ChartTooltip from 'src/components/chart/chart-tooltip'
import DataTable from 'src/components/data-table'
import VerificationFullNameLabel from 'src/components/verification-full-name-label'
import DocumentTypesLabel from 'src/components/document-types-label'
import Status from 'src/components/status-label'

function getDoсumentTypes(facematchScore) {
  return uniq(
    flatten(facematchScore).filter(t => AVAILABLE_DOCUMENT_TYPES.includes(t))
  )
}

const tableColumns = [
  {
    size: 3,
    label: <FormattedMessage id="identities.fields.fullName" />,
    content: ({ fullName }) => (
      <VerificationFullNameLabel>{fullName}</VerificationFullNameLabel>
    )
  },
  {
    size: 4,
    label: <FormattedMessage id="identities.fields.documentTypes" />,
    content: identity => (
      <DocumentTypesLabel types={getDoсumentTypes(identity.facematchScore)} />
    )
  },
  {
    size: 2,
    label: <FormattedMessage id="identities.fields.status" />,
    content: identity => <Status status={identity.status} />
  },
  {
    size: 2,
    label: <FormattedMessage id="identities.fields.date" />,
    content: identity => new Date(identity.dateCreated).toLocaleDateString()
  },
  {
    label: <FormattedMessage id="identities.fields.actions" />,
    content: identity => '...'
  }
]

function VerificationsChartTooltip({ payload }) {
  return (
    <ChartTooltip header={payload.tooltipHeader}>
      <ChartLegendItem
        color="blue"
        label={<FormattedMessage id="users.all" />}
        value={String(payload.value || 0)}
      />
      <ChartLegendItem
        color="green"
        label={<FormattedMessage id="users.verified_manually" />}
        value={String(payload.verified || 0)}
      />
      <ChartLegendItem
        color="orange"
        label={<FormattedMessage id="users.verified_manually" />}
        value={String(payload.unverified || 0)}
      />
    </ChartTooltip>
  )
}

export default
@connect(
  state => ({
    identities: state.identities.identities,
    token: state.auth.token,
    monthlyIdentities: state.identities.monthlyIdentities
  }),
  { getIdentities }
)
class VerificationHistory extends React.Component {
  componentDidMount() {
    this.props.getIdentities(this.props.token)
  }

  render() {
    return (
      <Content>
        <Panel caption={<FormattedMessage id="identities.title" />}>
          <Panel.Body padded={false}>
            <DataTable rows={this.props.identities} columns={tableColumns} />
          </Panel.Body>
        </Panel>
        <Panel caption={<FormattedMessage id="analytics" />}>
          <Panel.Header>
            <FormattedMessage id="identities.total" />{' '}
            <strong>{this.props.identities.length}</strong>
          </Panel.Header>
          <Panel.Body>
            <Chart
              tooltipContent={<VerificationsChartTooltip />}
              data={this.props.monthlyIdentities}
            />
          </Panel.Body>
        </Panel>
      </Content>
    )
  }
}
