import React from 'react'
import fp from 'lodash/fp'
import { connect } from 'react-redux'
import { isEmpty, pickBy, mapValues, get, compact } from 'lodash'
import {
  getIdentities,
  getIdentitiesCount,
  deleteIdentity
} from 'state/identities'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { Content } from 'components/application-box'
import DataTable from 'components/data-table'
import VerificationFullNameLabel from 'fragments/verifications/verification-full-name-label'
import Status from 'fragments/verifications/status-label'
import FiltersForm from './filters-form'
import Pagination from 'components/pagination'
import Items from 'components/items'
import { DebounceInput } from 'components/inputs'
import Spinner from 'components/spinner'
import confirm from 'components/confirm'
import PageContentLayout from 'components/page-content-layout'
import { isFeatureEnabled } from 'lib/isFeatureEnabled'
import { ReactComponent as DeleteIcon } from '../verification-detail/delete-icon.svg'
import CSS from './VerificationHistory.module.scss'

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
    params.status = compact(params.status)
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

  deleteIdentity = (e, identity) => {
    e.stopPropagation()
    confirm(<FormattedMessage id="verificationModal.delete.confirm" />).then(
      () => this.props.deleteIdentity(this.props.token, identity.identity.id),
      () => {}
    )
  }

  openVerification = ({ identity }) => {
    this.props.history.push(`/verifications/${identity.id}`)
  }

  getTableColumns = () => {
    let columns = [
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
        size: 1.5,
        label: <FormattedMessage id="identities.fields.date" />,
        content: identity => new Date(identity.dateUpdated).toLocaleDateString()
      },
      {
        size: 1,
        label: '',
        align: 'right',
        content: identity => {
          let isDeleting = this.props.deletingIdentities.includes(
            identity.identity.id
          )
          return (
            <div
              className={CSS.deleteIdentity}
              onClick={e => !isDeleting && this.deleteIdentity(e, identity)}
            >
              {isDeleting ? <Spinner /> : <DeleteIcon />}
            </div>
          )
        }
      }
    ]
    if (isFeatureEnabled('STATUSES')) {
      columns.splice(1, 0, {
        size: 3,
        label: <FormattedMessage id="identities.fields.status" />,
        content: identity => (
          <Status status={identity.identity.status} coloredText={true} />
        )
      })
    }
    return columns
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

    const disabledRows = this.props.identities.filter(identity => {
      return this.props.deletingIdentities.includes(identity.identity.id)
    })

    const pageCount = Math.ceil(this.props.count / ITEMS_PER_PAGE)

    const forcePage = Math.floor(this.state.params.offset / ITEMS_PER_PAGE) || 0
    return (
      <Content>
        <DebounceInput
          name="search"
          placeholder={this.props.intl.formatMessage({
            id: 'identities.filters.placeholder.search'
          })}
          maxLength={30}
          value={transformedParams.search}
          className={CSS.searchField}
          hideLabel={true}
          onChange={e => {
            this.onFilterChange({ search: e.target.value })
          }}
        />
        <PageContentLayout>
          <main>
            <Items flow="row">
              <DataTable
                rows={this.props.identities}
                columns={this.getTableColumns()}
                disabledRows={disabledRows}
                emptyBodyLabel={<FormattedMessage id="identities.no-data" />}
                onRowClick={this.openVerification}
                isLoading={this.props.isLoading}
              />
              {this.props.count > ITEMS_PER_PAGE &&
                !this.props.countIsLoading && (
                  <Pagination
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    forcePage={forcePage}
                    onPageChange={this.onPageChange}
                  />
                )}
            </Items>
          </main>
          <aside>
            <FiltersForm
              onChange={this.onFilterChange}
              onClear={this.clearSelectedFilters}
              {...transformedParams}
            />
          </aside>
        </PageContentLayout>
      </Content>
    )
  }
}

export default fp.flowRight(
  connect(
    state => ({
      isLoading: state.identities.isLoading,
      countIsLoading: state.identities.countIsLoading,
      deletingIdentities: state.identities.deletingIdentities,
      identities: state.identities.identities,
      count: state.identities.count,
      token: state.auth.token
    }),
    { getIdentities, getIdentitiesCount, deleteIdentity }
  ),
  injectIntl
)(VerificationHistory)
