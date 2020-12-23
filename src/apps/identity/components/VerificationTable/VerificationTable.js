import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import { PriorityHigh } from '@material-ui/icons';
import { PageLoader } from 'apps/layout';
import { ReactComponent as EmptyTableIcon } from 'assets/empty-table.svg';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { utcToLocalFormat } from 'lib/date';
import { titleCase } from 'lib/string';
import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { identitiesListLoad, identityRemove } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectIdentityCollection, selectIdentityCountModel, selectIdentityFilter } from 'state/identities/identities.selectors';
import { IdentityStatuses, OrderDirections, OrderKeys } from '../../../../models/Identity.model';
import { Routes } from '../../../../models/Router.model';
import { SkeletonLoader } from '../../../ui/components/SkeletonLoader/SkeletonLoader';
import { useConfirmDelete } from '../DeleteModal/DeleteModal';
import { NoVerifications } from '../NoVerifications/NoVerifications';
import { StatusLabel } from '../StatusLabel';
import { VerificationFlowName } from '../VerificationFlowName/VerificationFlowName';
import { TableRowHovered, useStyles } from './VerificationTable.styles';
import { ITEMS_PER_PAGE } from '../../../../models/Pagination.model';

export function VerificationTable() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [orderBy] = useState('');
  const [order] = useState(OrderDirections.asc);
  const [mouseUpExpired, setMouseUpExpired] = useState(false);
  const identityCollection = useSelector(selectIdentityCollection);
  const filteredCount = useSelector(selectFilteredCountModel);
  const identityFilter = useSelector(selectIdentityFilter);
  const countModel = useSelector(selectIdentityCountModel);
  const history = useHistory();
  const confirmDelete = useConfirmDelete();

  useEffect(() => {
    setOffset(0);
  }, [identityFilter]);

  useEffect(() => {
    const difference = filteredCount.value - offset;
    setHasMore(identityCollection.isLoaded && filteredCount.isLoaded && difference >= ITEMS_PER_PAGE);
  }, [filteredCount.isLoaded, filteredCount.value, identityCollection.isLoaded, offset]);

  const handleRemove = useCallback(async (e, id) => {
    e.stopPropagation();
    if (deleting) {
      return;
    }
    try {
      setDeleting(id);
      await confirmDelete();
      await dispatch(identityRemove(id));
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
    } finally {
      setDeleting(null);
    }
  }, [dispatch, deleting, confirmDelete]);

  const handleNextData = useCallback(() => {
    if (hasMore) {
      const difference = filteredCount.value - offset;
      const maxOffset = difference >= ITEMS_PER_PAGE ? ITEMS_PER_PAGE : difference;
      dispatch(identitiesListLoad(false, { offset: offset + maxOffset }));
      setOffset(((prevState) => prevState + maxOffset));
    }
  }, [dispatch, filteredCount.value, hasMore, offset]);

  const handleRedirect = useCallback((id) => {
    history.push({
      pathname: `${Routes.list.root}/${id}`,
      state: { from: history.location.pathname + history.location.search },
    });
  }, [history]);

  const onMouseDownHandler = useCallback((event) => {
    if (event.button === 0) {
      setMouseUpExpired(false);
      setTimeout(() => setMouseUpExpired(true), 200);
    }
    if (event.button === 1) {
      event.preventDefault();
    }
  }, []);

  const onMouseUpHandler = useCallback((event, id) => {
    if (event.button === 0 && !mouseUpExpired) {
      handleRedirect(id);
    }
    if (event.button === 1) {
      window.open(`${Routes.list.root}/${id}`, '_blank');
    }
  }, [handleRedirect, mouseUpExpired]);

  return (
    <TableContainer className={classes.container}>
      <InfiniteScroll
        next={handleNextData}
        hasMore={hasMore}
        loader={!filteredCount.isLoading && (
          <Box p={1.4} pt={2.4} width="100%" align="center" className={classes.loader}>
            <IconLoad width={25} />
          </Box>
        )}
        scrollThreshold={0.7}
        dataLength={identityCollection?.value?.length || 0}
      >
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell sortDirection={orderBy === OrderKeys.fullName ? order : false}>
                <Typography variant="subtitle2" className={classes.title}>
                  {intl.formatMessage({ id: 'identity.field.fullName' })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" className={classes.title}>
                  {intl.formatMessage({ id: 'identity.field.verificationFlow' })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" className={classes.title}>
                  {intl.formatMessage({ id: 'identity.field.date' })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" className={classes.title}>
                  {intl.formatMessage({ id: 'identity.field.status' })}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(identityFilter.offset === 0 && identityCollection.isLoading && !identityCollection.isLoaded)
            || (identityCollection.isLoaded && identityCollection.value.length === 0)
              ? (
                <TableRow>
                  <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                    {countModel.isLoaded && countModel.value === 0 ? (
                      <NoVerifications />)
                      : identityCollection.isLoading
                        ? <Box py={2.5}><PageLoader size={50} /></Box>
                        : (
                          <Box mb="10vh">
                            <Box py={2.5}><EmptyTableIcon /></Box>
                            <Typography variant="h4">{intl.formatMessage({ id: 'VerificationTable.emptySearch' })}</Typography>
                          </Box>
                        )}
                  </TableCell>
                </TableRow>
              )
              : identityCollection?.value?.map((item) => (
                <TableRowHovered
                  hover
                  key={item.id}
                  onMouseDown={onMouseDownHandler}
                  onMouseUp={(event) => onMouseUpHandler(event, item.id)}
                >
                  <TableCell>
                    <Box
                      mb={{
                        xs: 2,
                        lg: 0,
                      }}
                      pr={{
                        xs: 3,
                        lg: 0,
                      }}
                    >
                      {!item.fullName && item.status === IdentityStatuses.running ? (
                        <SkeletonLoader animation="wave" variant="text" width={140} />)
                        : !item.fullName
                          ? (
                            <Typography variant="subtitle2" className={classes.itemNameEmpty}>
                              {intl.formatMessage({ id: 'identity.nameNotFound' })}
                            </Typography>
                          )
                          : (
                            <Typography variant="subtitle2" className={classes.itemName}>{titleCase(item.fullName)}</Typography>
                          )}
                      <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.fullName' })}</Box>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.itemData}>
                    <Box mb={{
                      xs: 2,
                      lg: 0,
                    }}
                    >
                      <VerificationFlowName flowId={item.flowId} />
                      <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.verificationFlow' })}</Box>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.itemData}>
                    <Box mb={{
                      xs: 2,
                      lg: 0,
                    }}
                    >
                      {utcToLocalFormat(item.dateCreated)}
                      <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.date' })}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusLabel status={item.status} />
                    <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.status' })}</Box>
                  </TableCell>
                  <TableCell className={classes.iconDeleteWrapper}>
                    <IconButton
                      size="small"
                      onMouseUp={(e) => handleRemove(e, item.id)}
                      tabIndex="-1"
                      className={classes.iconButtonDelete}
                    >
                      {item.id === deleting ? <IconLoad /> : <FiTrash2 className="color-red" />}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    className={classes.iconReviewWrapper}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.status === IdentityStatuses.reviewNeeded && (
                      <Tooltip
                        onMouseUp={(e) => e.stopPropagation()}
                        enterTouchDelay={0}
                        placement="top"
                        arrow
                        classes={{
                          tooltip: classes.tooltip,
                          arrow: classes.tooltipArrow,
                        }}
                        title={intl.formatMessage({ id: 'VerificationTable.reviewNeeded' })}
                      >
                        <IconButton
                          size="small"
                          className={classes.iconButtonReview}
                        >
                          <PriorityHigh />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRowHovered>
              ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
}
