import React from 'react'
import { connect } from 'react-redux'
import { flatten, uniq, isEmpty, pickBy, mapValues, get } from 'lodash'
import fp from 'lodash/fp'
import { getIdentities, getIdentityWithNestedData } from 'src/state/identities'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { AVAILABLE_DOCUMENT_TYPES } from 'src/state/merchant'
import { Content } from 'src/components/application-box'
import DataTable from 'src/components/data-table'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import DocumentTypesLabel from 'src/fragments/document-types-label'
import Status from 'src/fragments/status-label'
import FiltersForm from './filters-form'

function getDocumentTypes(facematchScore) {
  return uniq(
    flatten(facematchScore).filter(t => AVAILABLE_DOCUMENT_TYPES.includes(t))
  )
}

const FILTERS = ['search', 'status', 'dateUpdated[start]', 'dateUpdated[end]']

const FILTER_TRANSFORMERS = {
  status: string => string.split(','),
  'dateUpdated[start]': string => (string ? moment(string) : undefined),
  'dateUpdated[end]': string => (string ? moment(string) : undefined)
}

function transformValue(key, value) {
  return get(FILTER_TRANSFORMERS, key, v => v)(value)
}

const FILTER_FORMATTERS = {
  status: array => array.join(','),
  'dateUpdated[start]': date => date.toJSON(),
  'dateUpdated[end]': date => date.toJSON()
}

function formatValue(key, value) {
  return get(FILTER_FORMATTERS, key, v => v)(value)
}

// takes an URLSearchParams instance as input, returns object with params
export function prepareParams(searchString, allowedKeys) {
  return fp.flow(
    string => new URLSearchParams(searchString),
    params => Array.from(params),
    fp.fromPairs,
    allowedKeys ? fp.pick(allowedKeys) : fp.identity,
    fp.pickBy(v => !isEmpty(v))
  )(searchString)
}

export default
@connect(
  state => ({
    isLoading: state.identities.isLoading,
    identities: state.identities.identities,
    token: state.auth.token
  }),
  { getIdentities, getIdentityWithNestedData }
)
class VerificationHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {}
    }
  }

  componentDidMount() {
    const params = prepareParams(this.props.location.search, FILTERS)
    this.setState({ params }, this.fetchIdentities)
  }

  fetchIdentities() {
    this.props.getIdentities(
      this.props.token,
      pickBy(this.state.params, v => !isEmpty(v))
    )
  }

  replaceLocation() {
    const search = new URLSearchParams(this.props.location.search)
    FILTERS.forEach(key =>
      isEmpty(this.state.params[key])
        ? search.delete(key)
        : search.set(key, this.state.params[key])
    )
    window.history.replaceState(
      null,
      null,
      Array.from(search.keys()).length
        ? `?${search.toString()}`
        : this.props.location.pathname
    )
  }

  onFilterChange = params => {
    const formattedParams = mapValues(params, (value, key) =>
      formatValue(key, value)
    )
    this.setState(
      { params: { ...this.state.params, ...formattedParams } },
      () => {
        this.fetchIdentities()
        this.replaceLocation()
      }
    )
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
        content: identity => new Date(identity.dateUpdated).toLocaleDateString()
      }
    ]
  }

  clearSelectedFilters = () => {
    const params = {}
    if (this.state.params.search) {
      params.search = this.state.params.search
    }
    this.setState({ params }, () => {
      this.fetchIdentities()
      this.replaceLocation()
    })
  }

  render() {
    const transformedParams = mapValues(this.state.params, (value, key) =>
      transformValue(key, value)
    )

    return (
      <Content>
        <h3>
          <FormattedMessage id="identities.title" />
        </h3>
        <section className="mgi-section mgi-section__no-border">
          <FiltersForm
            onChange={this.onFilterChange}
            onClear={this.clearSelectedFilters}
            {...transformedParams}
          />
        </section>
        <section className="mgi-section">
          <DataTable
            rows={this.props.identities}
            columns={this.getTableColumns()}
            emptyBodyLabel={<FormattedMessage id="identities.no-data" />}
            onRowClick={this.openVerification}
          />
        </section>
      </Content>
    )
  }
}
