import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, useMediaQuery } from '@material-ui/core';
import { useFilterParser } from 'apps/filter/hooks/filterURL.hook';
import { PageLoader } from 'apps/layout';
import { ReactComponent as EmptyTableIcon } from 'assets/empty-table.svg';
import { ReactComponent as TableSortActiveIcon } from 'assets/table-sort-active-icon.svg';
import { ReactComponent as TableSortIcon } from 'assets/table-sort-icon.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { verificationsListLoad } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectIdentityCollection, selectIdentityFilter } from 'state/identities/identities.selectors';
import { OrderDirections, OrderDirectionsNum, OrderKeyTypes, tableColumnsData, verificationsFilterStructure } from 'models/Identity.model';
import { ITEMS_PER_PAGE } from 'models/Pagination.model';
import { QATags } from 'models/QA.model';
import { appPalette } from 'apps/theme';
import { useQuery } from 'lib/url';
import { VerificationTableSortByMap } from '../../models/VerificationList.modal';
import { VerificationTableRow } from '../VerificationTableRow/VerificationTableRow';
import { useStyles } from './VerificationTable.styles';

export function VerificationTable() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const verificationFilter = useSelector(selectIdentityFilter);
  const { sortBy } = verificationFilter;
  const sortOrder = verificationFilter.sortOrder === OrderDirectionsNum.asc ? OrderDirections.asc : OrderDirections.desc;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [, addToUrl] = useFilterParser(verificationsFilterStructure);
  // For Customer Support
  const { asMerchantId } = useQuery();

  const verificationCollection = useSelector(selectIdentityCollection);
  const filteredCount = useSelector(selectFilteredCountModel);
  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), { noSsr: true });
  const paddingBottom = useMemo(() => (isDesktop ? 0 : 20), [isDesktop]);
  // +1 for loading spinner item
  const itemCount = useMemo(() => (hasMore ? verificationCollection?.value?.length + 1 : verificationCollection?.value?.length) || 0, [hasMore, verificationCollection]);
  const tableItemSize = useMemo(() => (isDesktop ? 50 + paddingBottom : 276 + paddingBottom), [isDesktop, paddingBottom]);

  useEffect(() => {
    setOffset(0);
  }, [verificationFilter]);

  useEffect(() => {
    const difference = filteredCount.value - offset;
    setHasMore(verificationCollection.isLoaded && filteredCount.isLoaded && difference >= ITEMS_PER_PAGE);
  }, [filteredCount.isLoaded, filteredCount.value, verificationCollection.isLoaded, offset]);

  const handleNextData = useCallback(() => {
    if (!verificationCollection.isLoading && hasMore) {
      const difference = filteredCount.value - offset;
      const maxOffset = difference >= ITEMS_PER_PAGE ? ITEMS_PER_PAGE : difference;
      dispatch(verificationsListLoad(false, { offset: offset + maxOffset, asMerchantId }));
      setOffset(((prevState) => prevState + maxOffset));
    }
  }, [asMerchantId, dispatch, filteredCount.value, hasMore, verificationCollection.isLoading, offset]);

  const createSortHandler = useCallback((id: OrderKeyTypes) => () => {
    const isAsc = sortBy === VerificationTableSortByMap[id] && sortOrder === OrderDirections.asc;
    addToUrl({
      sortBy: VerificationTableSortByMap[id],
      sortOrder: isAsc ? OrderDirectionsNum.desc : OrderDirectionsNum.asc,
    });
  }, [addToUrl, sortBy, sortOrder]);

  const isItemLoaded = useCallback((index) => !hasMore || index < verificationCollection?.value?.length, [hasMore, verificationCollection]);

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} data-qa={QATags.VerificationList.Table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {/* Header cells */}
            {tableColumnsData.map(({ id, isSortable }) => (
              <React.Fragment key={id}>
                {id && isSortable ? (
                  <TableCell className={classes.tableHeadCell} onClick={createSortHandler(id)} sortDirection={sortBy === VerificationTableSortByMap[id] ? sortOrder : false}>
                    <Typography variant="subtitle2" className={classes.title}>
                      <TableSortLabel
                        IconComponent={sortBy === VerificationTableSortByMap[id] ? TableSortActiveIcon : TableSortIcon}
                        active={sortBy === VerificationTableSortByMap[id]}
                        direction={sortBy === VerificationTableSortByMap[id] ? sortOrder : OrderDirections.asc}
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

        {(verificationFilter.offset === 0 && verificationCollection.isLoading && !verificationCollection.isLoaded)
        || (verificationCollection.isLoaded && verificationCollection.value.length === 0)
          ? (
            <TableBody>
              <TableRow>
                <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                  {verificationCollection.isLoading
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
                      // @ts-ignore
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
