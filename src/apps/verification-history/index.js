import React from 'react'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { flatten, uniq } from 'lodash'
import { compose } from 'lodash/fp'
import { getIdentities, getIdentityWithNestedData } from 'src/state/identities'
import {
  filterBySearch,
  filterByStates,
  filterByTypes
} from 'src/state/identities/filtering'
import { FormattedMessage } from 'react-intl'
import { AVAILABLE_DOCUMENT_TYPES } from 'src/state/merchant'
import { authorizedUrl } from 'src/lib/client/http'
import { Content } from 'src/components/application-box'
import Button from 'src/components/button'
import Panel from 'src/components/panel'
import DataTable from 'src/components/data-table'
import VerificationFullNameLabel from 'src/components/verification-full-name-label'
import DocumentTypesLabel from 'src/components/document-types-label'
import Status from 'src/components/status-label'
import VerificationModal from 'src/components/verification-modal'
import SpinnerPage from 'src/components/spinner-page'
import FiltersForm from './filters-form'
import { extractIdentityData } from 'src/components/verification-details'
import stringify from 'src/lib/stringify'
import CSS from './styles.css'
import MoreIcon from './more.svg'

const IDENTITY_CHECK_INTERVAL = 5000

function getDoсumentTypes(facematchScore) {
  return uniq(
    flatten(facematchScore).filter(t => AVAILABLE_DOCUMENT_TYPES.includes(t))
  )
}

export default
@connect(
  state => ({
    isLoading: state.identities.isLoading,
    identities: state.identities.identities,
    token: state.auth.token,
    monthlyIdentities: state.identities.monthlyIdentities
  }),
  { getIdentities, getIdentityWithNestedData }
)
class VerificationHistory extends ReactQueryParams {
  defaultQueryParams = {
    states: '[]',
    types: '[]',
    search: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getIdentities(this.props.token)
  }

  showVerificationModal = ({ id }) => {
    // Move this crazy api call to redux
    const fetchIdentity = (id) => {
      const { token, getIdentityWithNestedData } = this.props
      return getIdentityWithNestedData(token, id).then(identityWithNestedData => {
        this.setState({
          isModalLoading: false,
          identityWithNestedData
        })
        return identityWithNestedData
      })
    }

    // save current URL, so we can restore it on modal close
    this.previousURL = `${window.location.pathname}${window.location.search}`

    this.setState({
      showVerificationModal: true,
      identityWithNestedData: {},
      isModalLoading: true
    })
    window.clearInterval(this.modalInterval)
    fetchIdentity(id).then(() => {
      this.modalInterval = window.setInterval(
        () => fetchIdentity(id),
        IDENTITY_CHECK_INTERVAL
      )
    })
  }

  closeVerificationModal = () => {
    window.history.replaceState(null, null, this.previousURL)
    this.setState({ showVerificationModal: false })
    window.clearInterval(this.modalInterval)
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
          // <Link to={`/verifications/${identity.id}`}>
          // <MoreIcon />
          // </Link>
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

  clearSelectedFilters() {
    this.setQueryParams({
      states: [],
      types: [],
      search: this.queryParams.search
    })
  }

  render() {
    if (this.props.isLoading) {
      return <SpinnerPage />
    }

    const search = decodeURIComponent(this.queryParams.search || '')

    const filterIdentities = compose(
      filterBySearch(search.trim().toLowerCase()),
      filterByStates(this.queryParams.states),
      filterByTypes(this.queryParams.types)
    )

    const visibleIdentities = filterIdentities(this.props.identities)

    return (
      <Content>
        {this.state.showVerificationModal && (
          <VerificationModal
            onClose={this.closeVerificationModal}
            isLoading={this.state.isModalLoading}
            fullName={this.state.lastVerificationFullName}
            signURL={url => authorizedUrl(url, this.props.token)}
            webhook={stringify(
              this.state.identityWithNestedData.originalIdentity || {}
            )}
            {...extractIdentityData(this.state.identityWithNestedData)}
          />
        )}
        <Panel caption={<FormattedMessage id="identities.title" />}>
          <Panel.Header>
            <FiltersForm
              search={search}
              types={this.queryParams.types}
              states={this.queryParams.states}
              onChange={this.setQueryParams.bind(this)}
              onClear={this.clearSelectedFilters.bind(this)}
            />
          </Panel.Header>
          <Panel.Body padded={false}>
            <DataTable
              rows={visibleIdentities}
              columns={this.getTableColumns()}
              emptyBodyLabel={<FormattedMessage id="identities.no-data" />}
            />
          </Panel.Body>
        </Panel>
      </Content>
    )
  }
}
