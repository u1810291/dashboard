import React from 'react'
import { connect } from 'react-redux'
import { flatten, uniq, get } from 'lodash'
import { getIdentities } from 'src/state/identities'
import { FormattedMessage, injectIntl } from 'react-intl'
import { AVAILABLE_DOCUMENT_TYPES } from 'src/state/merchant'
import client from 'src/lib/client'
import { authorizedUrl } from 'src/lib/client/http'
import { Content } from 'src/components/application-box'
import Button from 'src/components/button'
import Panel from 'src/components/panel'
import Chart from 'src/components/chart'
import ChartLegendItem from 'src/components/chart/legend-item'
import ChartTooltip from 'src/components/chart/chart-tooltip'
import DataTable from 'src/components/data-table'
import VerificationFullNameLabel from 'src/components/verification-full-name-label'
import DocumentTypesLabel from 'src/components/document-types-label'
import Status from 'src/components/status-label'
import VerificationModal from 'src/components/verification-modal'
import stringify from 'src/lib/stringify'
import CSS from './styles.css'
import MoreIcon from './more.svg'

function getDoсumentTypes(facematchScore) {
  return uniq(
    flatten(facematchScore).filter(t => AVAILABLE_DOCUMENT_TYPES.includes(t))
  )
}

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

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

export default
@connect(
  state => ({
    identities: state.identities.identities,
    token: state.auth.token,
    monthlyIdentities: state.identities.monthlyIdentities
  }),
  { getIdentities }
)
@injectIntl
class VerificationHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getIdentities(this.props.token)
  }

  showVerificationModal = identity => {
    const { intl, token } = this.props

    client.identities
      .getDocumentsFullData(token, identity.id)
      .then(response => {
        const photos = []
        if (get(identity, '_links.photo.href')) {
          photos.push({
            caption: intl.formatMessage({
              id: 'verifirationModal.fields.face'
            }),
            href: authorizedUrl(identity._links.photo.href + '.jpg', token)
          })
        }

        const documents = []

        response.forEach(doc => {
          photos.push({
            caption: intl.formatMessage({
              id: `verifirationModal.fields.${doc.type}`
            }),
            href: authorizedUrl(doc.pictures[0]._links.file.href, token)
          })
          const document = {
            caption: intl.formatMessage({ id: 'verifirationModal.idcheck' }),
            origin: intl.formatMessage({
              id: `verifirationModal.fields.${doc.type}`
            }),
            fields: doc.fields.map(field => ({
              caption: intl.formatMessage({
                id: `identities.fields.${field.id}`
              }),
              value: field.value,
              status: doc.status
            }))
          }
          const faceMatchValue = (identity.facematchScore.find(
            s => s[0] === doc.type
          ) || [])[1]
          document.fields.unshift({
            caption: intl.formatMessage({ id: 'identities.fields.faceMatch' }),
            value: percents(faceMatchValue),
            status: parseInt(faceMatchValue, 10) > 70 ? 'ready' : 'warning'
          })
          documents.push(document)
        })
        this.setState({
          showVerificationModal: true,
          lastVerificationPhotos: photos,
          lastVerificationDocuments: documents,
          lastVerificationWebhook: stringify(identity)
        })
      })
  }

  getTableColumns = () => {
    return [
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
          <DocumentTypesLabel
            types={getDoсumentTypes(identity.facematchScore)}
          />
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
        className: CSS.actionRow,
        content: identity => (
          <Button
            onClick={() => this.showVerificationModal(identity)}
            buttonStyle="no-borders default"
          >
            <MoreIcon />
          </Button>
        )
      }
    ]
  }

  render() {
    return (
      <Content>
        {this.state.showVerificationModal && (
          <VerificationModal
            onClose={() => this.setState({ showVerificationModal: false })}
            fullName="Daniela Hernandez"
            photos={this.state.lastVerificationPhotos}
            documents={this.state.lastVerificationDocuments}
            webhook={this.state.lastVerificationWebhook}
          />
        )}
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
        <Panel caption={<FormattedMessage id="identities.title" />}>
          <Panel.Body padded={false}>
            <DataTable
              rows={this.props.identities}
              columns={this.getTableColumns()}
            />
          </Panel.Body>
        </Panel>
      </Content>
    )
  }
}
