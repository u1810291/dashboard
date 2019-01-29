import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, pickBy, mapValues, get } from 'lodash'
import fp from 'lodash/fp'
import { getIdentities, getIdentitiesCount } from 'src/state/identities'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Content } from 'src/components/application-box'
import DataTable from 'src/components/data-table'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import Status from 'src/fragments/status-label'
import FiltersForm from './filters-form'
import Pagination from 'src/components/pagination'
import Panel from 'src/components/panel'

const FILTERS = [
  'search',
  'status',
  'offset',
  'dateUpdated[start]',
  'dateUpdated[end]'
]

const FILTER_TRANSFORMERS = {
  status: string => string.split(','),
  'dateUpdated[start]': string => (string ? moment(string) : undefined),
  'dateUpdated[end]': string => (string ? moment(string) : undefined),
  offset: offset => offset
}

function transformValue(key, value) {
  return get(FILTER_TRANSFORMERS, key, v => v)(value)
}

const FILTER_FORMATTERS = {
  status: array => array.join(','),
  'dateUpdated[start]': date => date.toJSON(),
  'dateUpdated[end]': date => date.toJSON(),
  offset: offset => offset
}

const ITEMS_PER_PAGE = 20

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
    count: state.identities.count,
    token: state.auth.token
  }),
  { getIdentities, getIdentitiesCount }
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
    this.setState({ params }, () => {
      this.fetchIdentities()
      this.fetchIdentitiesCount()
    })
  }

  fetchIdentities() {
    const params = pickBy(this.state.params, v => !isEmpty(v))
    this.props.getIdentities(this.props.token, {
      ...params,
      limit: ITEMS_PER_PAGE
    })
  }

  fetchIdentitiesCount() {
    const params = pickBy(
      this.state.params,
      (v, k) => !isEmpty(v) && !['offset'].includes(k)
    )
    this.props.getIdentitiesCount(this.props.token, params)
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
    formattedParams.offset = 0
    this.setState(
      { params: { ...this.state.params, ...formattedParams } },
      () => {
        this.fetchIdentities()
        this.fetchIdentitiesCount()
        this.replaceLocation()
      }
    )
  }

  onPageChange = ({ selected: pageNum }) => {
    if (pageNum === undefined) return
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: (pageNum * ITEMS_PER_PAGE).toString()
        }
      },
      () => {
        this.fetchIdentities()
        this.replaceLocation()
      }
    )
  }

  openVerification = ({ identity }) => {
    this.props.history.push(`/verifications/${identity.id}`)
  }

  getTableColumns = () => {
    return [
      {
        size: 5,
        label: <FormattedMessage id="identities.fields.fullName" />,
        content: ({ identity }) => (
          <VerificationFullNameLabel>
            {identity.fullName}
          </VerificationFullNameLabel>
        )
      },
      {
        size: 3,
        label: <FormattedMessage id="identities.fields.status" />,
        content: identity => <Status status={identity.identity.status} />
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

    // const pageCount = Math.ceil(this.props.identitiesCount / this.LIMIT)
    const forcePage = Math.floor(this.state.params.offset / ITEMS_PER_PAGE) || 0

    return (
      <Content>
        <h1>
          <FormattedMessage id="identities.title" />
        </h1>
        <FiltersForm
          onChange={this.onFilterChange}
          onClear={this.clearSelectedFilters}
          {...transformedParams}
        />
        <DataTable
          rows={this.props.identities}
          columns={this.getTableColumns()}
          emptyBodyLabel={<FormattedMessage id="identities.no-data" />}
          onRowClick={this.openVerification}
        />
        {this.props.count > ITEMS_PER_PAGE && (
          <Panel>
            <Pagination
              pageCount={this.props.count}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              forcePage={forcePage}
              onPageChange={this.onPageChange}
            />
          </Panel>
        )}
      </Content>
    )
  }
}
