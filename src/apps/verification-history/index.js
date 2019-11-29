import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { Content } from 'components/application-box';
import Card from 'components/card';
import confirm from 'components/confirm';
import DataTable from 'components/data-table';
import { DebounceInput } from 'components/inputs';
import Items from 'components/items';
import PageContentLayout from 'components/page-content-layout';
import Pagination from 'components/pagination';
import Text, { H2, HR } from 'components/text';
import { StatusLabel } from 'fragments/verifications/status-label/StatusLabel';
import { downloadBlob } from 'lib/file';
import { titleCase } from 'lib/string';
import { compact, get, isEmpty, mapValues, pickBy } from 'lodash';
import fp from 'lodash/fp';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FiDownload, FiLoader, FiTrash2 } from 'react-icons/fi';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { deleteIdentity, getIdentities, getIdentitiesCount, getIdentitiesFile } from 'state/identities/identities.actions';
import { ReactComponent as DrivingLicense } from './driving-license.svg';
import { ExampleCard } from './ExampleCard';
import FiltersForm from './filters-form';
import { ReactComponent as NationalId } from './national-id.svg';
import { ReactComponent as Passport } from './passport.svg';
import CSS from './VerificationHistory.module.scss';

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

class VerificationHistory extends React.Component {
  static defaultProps = {
    count: 0,
  };

  static propTypes = {
    count: PropTypes.number,
    countIsLoading: PropTypes.bool.isRequired,
    deleteIdentity: PropTypes.func.isRequired,
    deletingIdentities: PropTypes.arrayOf(PropTypes.string).isRequired,
    getIdentities: PropTypes.func.isRequired,
    getIdentitiesCount: PropTypes.func.isRequired,
    identities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

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
  };

  getTableColumns = () => {
    const columns = [
      {
        size: 2,
        align: 'left',
        label: <FormattedMessage id="identity.field.id" />,
        content: ({ identity }) => (
          <div>
            #
            {identity.id.slice(-6)}
          </div>
        ),
      },
      {
        size: 4,
        label: <FormattedMessage id="identity.field.fullName" />,
        content: ({ identity }) => (!isEmpty(identity.fullName)
          ? titleCase(identity.fullName)
          : (
            <Text color="gray">
              <FormattedMessage id="identity.nameNotFound" />
            </Text>
          )),
      },
      {
        size: 3,
        label: <FormattedMessage id="identity.field.date" />,
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
              {isDeleting ? <FiLoader /> : <FiTrash2 className={CSS.remove} />}
            </div>
          );
        },
      },
    ];
    columns.splice(1, 0, {
      size: 3,
      label: <FormattedMessage id="identity.field.status" />,
      content: ({ identity }) => (
        <StatusLabel
          status={identity.status}
          className={classNames({ threedots: identity.status === 'pending' })}
        />
      ),
    });
    return columns;
  };

  openVerification = ({ identity }) => {
    this.props.history.push(`/identities/${identity.id}`);
  };

  deleteIdentity = (e, identity) => {
    e.stopPropagation();
    confirm(<FormattedMessage id="verificationModal.delete.confirm" />).then(
      () => this.props.deleteIdentity(identity.identity.id),
      (error) => {
        console.error(error);
      },
    );
  };

  handleDownloadCSV = async () => {
    const params = pickBy(this.state.params, (item) => !isEmpty(item));

    const response = await this.props.getIdentitiesFile({
      ...params,
      format: 'csv',
    });
    const blob = new Blob([response.data]);
    downloadBlob(blob, 'mati-verifications.zip');
  };

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
  };

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
  };

  fetchIdentitiesCount() {
    // eslint-disable-next-line no-shadow
    const { state, props: { getIdentitiesCount } } = this;
    const params = pickBy(
      state.params,
      (v, k) => !isEmpty(v) && !['offset'].includes(k),
    );
    getIdentitiesCount(params);
  }

  fetchIdentities() {
    // eslint-disable-next-line no-shadow
    const { state, props: { getIdentities } } = this;
    const params = pickBy(state.params, (v) => !isEmpty(v));
    getIdentities({
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
        isLoadingFile,
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
                    link="/identities/demo/1"
                  />
                  <ExampleCard
                    icon={<Passport />}
                    key="2345"
                    labelId="passport"
                    link="/identities/demo/2"
                  />
                  <ExampleCard
                    icon={<DrivingLicense />}
                    key="2346"
                    labelId="drivingLicense"
                    link="/identities/demo/3"
                  />
                </Items>
              </Card>
            </main>
          </PageContentLayout>
        </Content>
      )
      : (
        <Content>
          <PageContentLayout navigation={false}>
            <main>
              <Items flow="column" align="center" justifyContent="space-between">
                <H2>
                  <span>{intl.formatMessage({ id: 'identities.title' })}</span>
                  <span className={CSS.titleCounter}>{` (${count || 0})`}</span>
                </H2>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleDownloadCSV}
                  startIcon={isLoadingFile ? <FiLoader /> : <FiDownload />}
                >
                  {intl.formatMessage({ id: 'identities.download-all-csv' })}
                </Button>
              </Items>
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
      isLoadingFile: state.identities.isLoadingFile,
      countIsLoading: state.identities.countIsLoading,
      deletingIdentities: state.identities.deletingIdentities,
      identities: state.identities.identities,
      count: state.identities.count,
    }),
    { getIdentities, getIdentitiesCount, deleteIdentity, getIdentitiesFile },
  ),
  injectIntl,
)(VerificationHistory);
