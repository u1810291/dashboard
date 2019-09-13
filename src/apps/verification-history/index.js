import PropTypes from 'prop-types';
import React from 'react';
import fp from 'lodash/fp';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, pickBy, mapValues, get, compact } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  getIdentities,
  getIdentitiesCount,
  deleteIdentity,
} from 'state/identities';
import { Content } from 'components/application-box';
import DataTable from 'components/data-table';
import Status from 'fragments/verifications/status-label';
import Pagination from 'components/pagination';
import Items from 'components/items';
import { DebounceInput } from 'components/inputs';
import Spinner from 'components/spinner';
import confirm from 'components/confirm';
import PageContentLayout from 'components/page-content-layout';
import isFeatureEnabled from 'lib/isFeatureEnabled';
import Text, { H2, HR } from 'components/text';
import Card from 'components/card';
import classNames from 'classnames';
import { titleCase } from 'lib/string';

import CSS from './VerificationHistory.module.scss';
import { ReactComponent as NationalId } from './national-id.svg';
import { ReactComponent as Passport } from './passport.svg';
import { ReactComponent as DrivingLicense } from './driving-license.svg';
import FiltersForm from './filters-form';
import { ReactComponent as DeleteIcon } from '../verification-detail/delete-icon.svg';

const FILTERS = [
  'search',
  'status',
  'offset',
  'dateCreated[start]',
  'dateCreated[end]',
];

const FILTER_TRANSFORMERS = {
  status: (string) => string.split(','),
  'dateCreated[start]': (string) => (string ? moment(string) : undefined),
  'dateCreated[end]': (string) => (string ? moment(string) : undefined),
  offset: (offset) => offset,
};

function transformValue(key, value) {
  return get(FILTER_TRANSFORMERS, key, (v) => v)(value);
}

const FILTER_FORMATTERS = {
  status: (array) => array.join(','),
  'dateCreated[start]': (date) => date.toJSON(),
  'dateCreated[end]': (date) => date.toJSON(),
  offset: (offset) => offset,
};

const ITEMS_PER_PAGE = 20;

function formatValue(key, value) {
  return get(FILTER_FORMATTERS, key, (v) => v)(value);
}

// takes an URLSearchParams instance as input, returns object with params
export function prepareParams(searchString, allowedKeys) {
  return fp.flow(
    () => new URLSearchParams(searchString),
    (params) => Array.from(params),
    fp.fromPairs,
    allowedKeys ? fp.pick(allowedKeys) : fp.identity,
    fp.pickBy((v) => !isEmpty(v)),
  )(searchString);
}

const ExampleCard = ({ icon, labelId, link }) => (
  <Link to={{ pathname: link }}>
    <Card border="lightergray" className={CSS.demoCard}>
      <Text align="center">{icon}</Text>
      <Text size={3} color="blue">
        <FormattedMessage id={`verificationDemo.${labelId}.label`} />
      </Text>
    </Card>
  </Link>
);

ExampleCard.propTypes = {
  icon: PropTypes.arrayOf([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  labelId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

class VerificationHistory extends React.Component {
  static defaultProps = {
    count: 0,
  }

  static propTypes = {
    count: PropTypes.number,
    countIsLoading: PropTypes.bool.isRequired,
    deleteIdentity: PropTypes.func.isRequired,
    deletingIdentities: PropTypes.arrayOf(PropTypes.string).isRequired,
    getIdentities: PropTypes.func.isRequired,
    getIdentitiesCount: PropTypes.func.isRequired,
    identities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isLoading: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      params: {},
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const params = prepareParams(location.search, FILTERS);
    this.setState({ params }, () => {
      this.fetchIdentities();
      this.fetchIdentitiesCount();
    });
  }

  clearSelectedFilters = () => {
    const params = {};
    if (this.state.params.search) {
      params.search = this.state.params.search;
    }
    this.setState({ params }, () => {
      this.fetchIdentities();
      this.fetchIdentitiesCount();
      this.replaceLocation();
    });
  }

  getTableColumns = () => {
    const columns = [
      {
        size: 2,
        align: 'left',
        label: <FormattedMessage id="identities.fields.id" />,
        content: ({ identity }) => (
          <div>
            #
            {identity.id.slice(-6)}
          </div>
        ),
      },
      {
        size: 4,
        label: <FormattedMessage id="identities.fields.fullName" />,
        content: ({ identity }) => (!isEmpty(identity.fullName)
          ? titleCase(identity.fullName)
          : (
            <Text color="gray">
              <FormattedMessage id="identities.nameNotFound" />
            </Text>
          )),
      },
      {
        size: 3,
        label: <FormattedMessage id="identities.fields.date" />,
        content: (identity) => moment.utc(identity.identity.dateCreated).format('MMM D, YYYY'),
      },
      {
        size: 1,
        label: '',
        align: 'right',
        content: (identity) => {
          const isDeleting = this.props.deletingIdentities.includes(
            identity.identity.id,
          );
          return (
            <div
              className={CSS.deleteIdentity}
              onClick={(e) => !isDeleting && this.deleteIdentity(e, identity)}
              onKeyUp={() => {}}
              role="button"
              tabIndex="0"
            >
              {isDeleting ? <Spinner /> : <DeleteIcon />}
            </div>
          );
        },
      },
    ];
    if (isFeatureEnabled('STATUSES')) {
      columns.splice(1, 0, {
        size: 3,
        label: <FormattedMessage id="identities.fields.status" />,
        content: ({ identity }) => (
          <Status
            status={identity.status}
            coloredText
            className={classNames({ threedots: identity.status === 'pending' })}
          />
        ),
      });
    }
    return columns;
  }

  openVerification = ({ identity }) => {
    this.props.history.push(`/verifications/${identity.id}`);
  }

  deleteIdentity = (e, identity) => {
    e.stopPropagation();
    confirm(<FormattedMessage id="verificationModal.delete.confirm" />).then(
      () => this.props.deleteIdentity(this.props.token, identity.identity.id),
      () => {},
    );
  }

  onFilterChange = (params) => {
    params.status = compact(params.status);
    const formattedParams = mapValues(params, (value, key) => formatValue(key, value),
    );
    formattedParams.offset = 0;
    this.setState(
      (state) => ({ params: { ...state.params, ...formattedParams } }),
      () => {
        this.fetchIdentities();
        this.fetchIdentitiesCount();
        this.replaceLocation();
      },
    );
  }

  onPageChange = ({ selected: pageNum }) => {
    if (pageNum === undefined) return;
    this.setState(
      (state) => ({
        params: {
          ...state.params,
          offset: (pageNum * ITEMS_PER_PAGE).toString(),
        },
      }),
      () => {
        this.fetchIdentities();
        this.replaceLocation();
      },
    );
  }

  fetchIdentitiesCount() {
    // eslint-disable-next-line no-shadow
    const { state, props: { getIdentitiesCount, token } } = this;
    const params = pickBy(
      state.params,
      (v, k) => !isEmpty(v) && !['offset'].includes(k),
    );
    getIdentitiesCount(token, params);
  }

  fetchIdentities() {
    // eslint-disable-next-line no-shadow
    const { state, props: { getIdentities, token } } = this;
    const params = pickBy(state.params, (v) => !isEmpty(v));
    getIdentities(token, {
      ...params,
      limit: ITEMS_PER_PAGE,
    });
  }

  replaceLocation() {
    const { props: { location }, state: { params } } = this;
    const search = new URLSearchParams(location.search);
    FILTERS.forEach((key) => (isEmpty(params[key])
      ? search.delete(key)
      : search.set(key, params[key])),
    );
    window.history.replaceState(
      null,
      null,
      Array.from(search.keys()).length
        ? `?${search.toString()}`
        : location.pathname,
    );
  }

  render() {
    const {
      props: {
        count,
        countIsLoading,
        deletingIdentities,
        identities,
        intl,
        isLoading,
      },
      state: { params },
    } = this;
    const transformedParams = mapValues(
      params,
      (value, key) => transformValue(key, value),
    );

    const disabledRows = identities
      .filter((identity) => deletingIdentities.includes(identity.identity.id));

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
    const forcePage = Math.floor(params.offset / ITEMS_PER_PAGE) || 0;

    return ((isEmpty(params) || !params.status) && !countIsLoading && count === 0)
      ? (
        <Content>
          <H2 lineHeight={4}>
            <FormattedMessage id="verificationDemo.nullCounter" values={{ counter: 0 }} />
          </H2>
          <PageContentLayout navigation={false}>
            <main>
              <Card padding={4} className={CSS.containerBox}>
                <Text size={4.5} weight={2} align="center">
                  <FormattedMessage id="verificationDemo.title" />
                </Text>
                <Text size={3} weight={4} align="center">
                  <FormattedMessage id="verificationDemo.subtitle" />
                </Text>

                <HR width={0} margin={15} />

                <Items flow="column" gap={4} justifyContent="center">
                  <ExampleCard
                    icon={<NationalId />}
                    key="2344"
                    labelId="nationalId"
                    link="/verifications/demo/1"
                  />
                  <ExampleCard
                    icon={<Passport />}
                    key="2345"
                    labelId="passport"
                    link="/verifications/demo/2"
                  />
                  <ExampleCard
                    icon={<DrivingLicense />}
                    key="2346"
                    labelId="drivingLicense"
                    link="/verifications/demo/3"
                  />
                </Items>
              </Card>
            </main>
          </PageContentLayout>
        </Content>
      )
      : (
        <Content>
          <DebounceInput
            name="search"
            placeholder={intl.formatMessage({
              id: 'identities.filters.placeholder.search',
            })}
            maxLength={30}
            value={transformedParams.search}
            className={CSS.searchField}
            hideLabel
            onChange={(e) => {
              this.onFilterChange({ search: e.target.value });
            }}
          />
          <PageContentLayout navigation={false}>
            <main>
              <Items flow="row">
                <DataTable
                  rows={identities}
                  columns={this.getTableColumns()}
                  disabledRows={disabledRows}
                  emptyBodyLabel={<FormattedMessage id="identities.no-data" />}
                  onRowClick={this.openVerification}
                  isLoading={isLoading}
                />
                {
                  count > ITEMS_PER_PAGE
                    && !countIsLoading
                    && (
                      <Pagination
                        pageCount={pageCount}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        forcePage={forcePage}
                        onPageChange={this.onPageChange}
                      />
                    )
                }
              </Items>
            </main>
            <aside>
              <FiltersForm
                onChange={this.onFilterChange}
                onClear={this.clearSelectedFilters}
                {...transformedParams} // eslint-disable-line react/jsx-props-no-spreading
              />
            </aside>
          </PageContentLayout>
        </Content>
      );
  }
}

export default fp.flowRight(
  connect(
    (state) => ({
      isLoading: state.identities.isLoading,
      countIsLoading: state.identities.countIsLoading,
      deletingIdentities: state.identities.deletingIdentities,
      identities: state.identities.identities,
      count: state.identities.count,
      token: state.auth.token,
    }),
    { getIdentities, getIdentitiesCount, deleteIdentity },
  ),
  injectIntl,
)(VerificationHistory);
