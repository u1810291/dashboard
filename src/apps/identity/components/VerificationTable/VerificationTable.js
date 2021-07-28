import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, useMediaQuery } from '@material-ui/core';
import { useFilterParser } from 'apps/filter/hooks/filterURL.hook';
import { Placeholder } from 'apps/ui/components/Placeholder/Placeholder';
import { PageLoader } from 'apps/layout';
import { ReactComponent as EmptyTableIcon } from 'assets/empty-table.svg';
import { ReactComponent as NoVerificationsIcon } from 'assets/empty-list.svg';
import { ReactComponent as TableSortActiveIcon } from 'assets/table-sort-active-icon.svg';
import { ReactComponent as TableSortIcon } from 'assets/table-sort-icon.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { identitiesListLoad } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectIdentityCollection, selectIdentityCountModel, selectIdentityFilter } from 'state/identities/identities.selectors';
import { OrderDirections, OrderDirectionsNum, tableColumnsData, verificationsFilterStructure } from 'models/Identity.model';
import { ITEMS_PER_PAGE } from 'models/Pagination.model';
import { QATags } from 'models/QA.model';
import { appPalette } from 'apps/theme';
import { useQuery } from 'lib/url';
import { REDUCE_DB_COUNT_CALLS } from 'models/Release.model';
import { useStyles } from './VerificationTable.styles';
import { VerificationTableRow } from '../VerificationTableRow/VerificationTableRow';

export function VerificationTable() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const identityFilter = useSelector(selectIdentityFilter);
  const { sortBy } = identityFilter;
  const sortOrder = identityFilter.sortOrder === OrderDirectionsNum.asc ? OrderDirections.asc : OrderDirections.desc;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [, addToUrl] = useFilterParser(verificationsFilterStructure);
  // For Customer Support
  const { asMerchantId } = useQuery();

  const identityCollection = useSelector(selectIdentityCollection);
  const filteredCount = useSelector(selectFilteredCountModel);
  const countModel = useSelector(selectIdentityCountModel);
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'), { noSsr: true });
  const paddingBottom = useMemo(() => (isDesktop ? 0 : 20), [isDesktop]);
  // +1 for loading spinner item
  const itemCount = useMemo(() => (hasMore ? identityCollection?.value?.length + 1 : identityCollection?.value?.length) || 0, [hasMore, identityCollection]);
  const tableItemSize = useMemo(() => (isDesktop ? 50 + paddingBottom : 276 + paddingBottom), [isDesktop, paddingBottom]);

  useEffect(() => {
    setOffset(0);
  }, [identityFilter]);

  useEffect(() => {
    const difference = filteredCount.value - offset;
    setHasMore(identityCollection.isLoaded && filteredCount.isLoaded && difference >= ITEMS_PER_PAGE);
  }, [filteredCount.isLoaded, filteredCount.value, identityCollection.isLoaded, offset]);

  const handleNextData = useCallback(() => {
    if (!identityCollection.isLoading && hasMore) {
      const difference = filteredCount.value - offset;
      const maxOffset = difference >= ITEMS_PER_PAGE ? ITEMS_PER_PAGE : difference;
      dispatch(identitiesListLoad(false, { offset: offset + maxOffset, asMerchantId }));
      setOffset(((prevState) => prevState + maxOffset));
    }
  }, [asMerchantId, dispatch, filteredCount.value, hasMore, identityCollection.isLoading, offset]);

  const createSortHandler = useCallback((id) => () => {
    const isAsc = sortBy === id && sortOrder === OrderDirections.asc;
    addToUrl({
      sortBy: id,
      sortOrder: isAsc ? OrderDirectionsNum.desc : OrderDirectionsNum.asc,
    });
  }, [addToUrl, sortBy, sortOrder]);

  const isItemLoaded = useCallback((index) => !hasMore || index < identityCollection?.value?.length, [hasMore, identityCollection]);

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} data-qa={QATags.VerificationList.Table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {/* Header cells */}
            {tableColumnsData.map(({ id, isSortable }) => (
              <React.Fragment key={id}>
                {id && !REDUCE_DB_COUNT_CALLS && isSortable ? (
                  <TableCell className={classes.tableHeadCell} onClick={createSortHandler(id)} sortDirection={sortBy === id ? sortOrder : false}>
                    <Typography variant="subtitle2" className={classes.title}>
                      <TableSortLabel
                        IconComponent={sortBy === id ? TableSortActiveIcon : TableSortIcon}
                        active={sortBy === id}
                        direction={sortBy === id ? sortOrder : OrderDirections.asc}
                      >
                        {intl.formatMessage({ id: `identity.field.${id}` })}
                      </TableSortLabel>
                    </Typography>
                  </TableCell>
                ) : (
                  <TableCell className={classes.tableHeadCell}>
                    <Typography variant="subtitle2" className={classes.title}>
                      {intl.formatMessage({ id: `identity.field.${id}` })}
                    </Typography>
                  </TableCell>
                )}
              </React.Fragment>
            ))}
          </TableRow>
        </TableHead>

        {(identityFilter.offset === 0 && identityCollection.isLoading && !identityCollection.isLoaded)
        || (identityCollection.isLoaded && identityCollection.value.length === 0)
          ? (
            <TableBody>
              <TableRow>
                <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                  {countModel.isLoaded && countModel.value === 0
                    ? (
                      <Placeholder
                        icon={<NoVerificationsIcon />}
                        title={intl.formatMessage({ id: 'verificationDemo.title' })}
                        text={intl.formatMessage({
                          id: 'verificationDemo.subtitle',
                        }, {
                          breakingLine: <br />,
                        })}
                        mb="10vh"
                      />
                    )
                    : identityCollection.isLoading
                      ? <Box py={2.5}><PageLoader size={50} color={appPalette.black50} /></Box>
                      : (
                        <Box mb="10vh">
                          <Box py={2.5}><EmptyTableIcon /></Box>
                          <Typography variant="h4">{intl.formatMessage({ id: 'VerificationTable.emptySearch' })}</Typography>
                        </Box>
                      )}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell className={classes.fixedListCell}>
                  {/* Infinity Scroll */}
                  <InfiniteLoader
                    loadMoreItems={handleNextData}
                    isItemLoaded={isItemLoaded}
                    threshold={15}
                    itemCount={itemCount}
                  >
                    {({ onItemsRendered, ref }) => (
                      <FixedSizeList
                        height={700}
                        itemSize={tableItemSize}
                        itemCount={itemCount}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        className={classes.fixedList}
                        itemData={{ paddingBottom }}
                      >
                        {VerificationTableRow}
                      </FixedSizeList>
                    )}
                  </InfiniteLoader>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
      </Table>
    </TableContainer>
  );
}
