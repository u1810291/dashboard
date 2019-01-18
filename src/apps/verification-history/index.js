import React from 'react'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'
import { flatten, uniq } from 'lodash'
import {
  getIdentities,
  getIdentityWithNestedData,
  patchIdentity,
  patchDocument
} from 'src/state/identities'
import { buildFiltersChain } from 'src/state/identities/filtering'
import { FormattedMessage } from 'react-intl'
import { AVAILABLE_DOCUMENT_TYPES } from 'src/state/merchant'
import { Content } from 'src/components/application-box'
import Panel from 'src/components/panel'
import DataTable from 'src/components/data-table'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import DocumentTypesLabel from 'src/fragments/document-types-label'
import Status from 'src/fragments/status-label'
import SpinnerPage from 'src/components/spinner-page'
import FiltersForm from './filters-form'

function getDocumentTypes(facematchScore) {
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
    monthlyIdentities: state.identities.monthlyIdentities,
    openedIdentity: {}
  }),
  { getIdentities, getIdentityWithNestedData, patchIdentity, patchDocument }
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

  openVerification = ({ id, fullName, status }) => {
    this.props.history.push(`/verifications/${id}`)
  }

  getTableColumns = () => {
    return [
      {
        size: 5,
        label: <FormattedMessage id="identities.fields.fullName" />,
        content: ({ fullName }) => (
          <VerificationFullNameLabel>{fullName}</VerificationFullNameLabel>
        )
      },
      {
        size: 3,
        label: <FormattedMessage id="identities.fields.documentTypes" />,
        content: identity => (
          <DocumentTypesLabel
            types={getDocumentTypes(identity.facematchScore)}
          />
        )
      },
      {
        size: 3,
        label: <FormattedMessage id="identities.fields.status" />,
        content: identity => <Status status={identity.status} />
      },
      {
        size: 1,
        label: <FormattedMessage id="identities.fields.date" />,
        content: identity => new Date(identity.dateCreated).toLocaleDateString()
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

    const filterIdentities = buildFiltersChain(
      search,
      this.queryParams.types,
      this.queryParams.states
    )
    const visibleIdentities = filterIdentities(this.props.identities)

    return (
      <Content>
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
              onRowClick={this.openVerification}
            />
          </Panel.Body>
        </Panel>
      </Content>
    )
  }
}
