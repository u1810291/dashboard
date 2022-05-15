import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from 'lib/debounce.hook';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import { notification, WarningBadge } from 'apps/ui';
import { FiEdit, FiTrash2, FiCheckSquare, FiRefreshCcw } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { WatchlistIdType } from 'models/Watchlist.model';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { KeyboardKeys } from 'models/Keyboard.model';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './BasicWatchlistList.styles';
import { DEFAULT_WATCHLIST_GROUP_NAME, IAmlBasicWatchlistGroupUI, IBasicWatchlistItemUI } from '../../models/Aml.model';

function AdminField({ value = '', isRunning, handleRefreshClick, handleEditClick, handleRemoveClick, isItem, isWatchlistError, disabled }: {
  value: string;
  disabled: boolean;
  isRunning?: boolean;
  handleEditClick: (value?: string, isNewGroup?: boolean, callback?: (loading: boolean, error?: unknown) => void) => void;
  handleRemoveClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleRefreshClick?: (event: React.MouseEvent<HTMLElement>) => void;
  isItem?: boolean;
  isWatchlistError?: boolean;
}) {
  const classes = useStyles();
  const isNewGroup = value === '';
  const [isEdit, setIsEdit] = useState<boolean>(isNewGroup);
  const [stateValue, setStateValue] = useState<string>(value);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const formatMessage = useFormatMessage();

  const handleApiCallback = (isLoading: boolean, error: unknown) => {
    setIsError(false);
    setLoading(isLoading);

    if (error) {
      setIsError(true);
      notification.error(formatMessage('BasicWatchlist.settings.notification.groupCreate.error.text'));
      return;
    }

    setIsEdit(false);
  };

  const handleInputBlur = (event) => {
    if (!event.target.value) {
      setIsError(true);
      return;
    }
    handleEditClick(event.target.value, isNewGroup, handleApiCallback);
  };

  const handleKeyDown = (event) => {
    if (event.key === KeyboardKeys.Enter) {
      if (!stateValue) {
        setIsError(true);
        return;
      }
      handleEditClick(event.target.value, isNewGroup, handleApiCallback);
    }
  };

  const handleIconButtonEdit = (event) => {
    event.stopPropagation();
    if (!stateValue) {
      setIsError(true);
      return;
    }
    handleEditClick(stateValue, undefined, handleApiCallback);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        {isEdit ? (
          <Input
            onChange={(event) => setStateValue(event.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            value={stateValue}
            autoFocus
            error={isError}
            placeholder={formatMessage('validations.required')}
            disabled={disabled || loading}
          />
        ) : (
          <Typography
            className={classNames({
              [classes.groupItemTitle]: isItem,
              [classes.header]: !isItem,
            })}
            title={stateValue}
          >
            {stateValue}
          </Typography>
        )}
      </Grid>
      <Grid item container justifyContent="flex-end" xs={5}>
        {isRunning && (
          <IconButton
            className={classNames(classes.button, classes.buttonRefresh)}
            onClick={handleRefreshClick}
            disabled={disabled || loading}
          >
            <FiRefreshCcw size={17} />
          </IconButton>
        )}
        {isWatchlistError && (
          <Box mr={1}>
            <WarningBadge isDefaultPosition={false} />
          </Box>
        )}
        {isEdit ? (
          <IconButton
            className={classNames(classes.button, classes.buttonEdit)}
            onClick={handleIconButtonEdit}
            disabled={disabled || loading}
          >
            <FiCheckSquare size={17} />
          </IconButton>
        ) : (
          <IconButton
            className={classNames(classes.button, classes.buttonEdit)}
            onClick={(event) => {
              event.stopPropagation();
              if (isItem) {
                handleEditClick();
                return;
              }
              setIsEdit(true);
            }}
            disabled={disabled}
          >
            <FiEdit size={17} />
          </IconButton>
        )}
        <IconButton className={classNames(classes.button, classes.buttonTrash)} onClick={handleRemoveClick} disabled={disabled || loading}>
          <FiTrash2 size={17} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function AmlBasicWatchlistListComponent({ data, isAdmin, runningWatchlists, disabled, handleRefreshClick, handleOpenWatchlist, handleGroupItemSwitch, handleEditClick, handleRemoveClick }: {
  data: IAmlBasicWatchlistGroupUI[];
  isAdmin: boolean;
  disabled: boolean;
  runningWatchlists: WatchlistIdType[];
  handleGroupItemSwitch: (group: IAmlBasicWatchlistGroupUI, groupItemId: number, value: boolean) => void;
  handleEditClick: (group: IAmlBasicWatchlistGroupUI, groupItemId?: number) => (value?: string, isNewGroup?: boolean) => void;
  handleRemoveClick: (group: IAmlBasicWatchlistGroupUI, groupItemId?: number) => (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenWatchlist: (watchlist?: IBasicWatchlistItemUI) => () => void;
  handleRefreshClick: (watchlistId: WatchlistIdType) => (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const classes = useStyles();
  const debounced = useDebounce();

  const handleOnChange = useCallback((group: IAmlBasicWatchlistGroupUI, groupItemId: number) => (event, checked: boolean) => {
    debounced(() => handleGroupItemSwitch(group, groupItemId, checked));
  }, [debounced, handleGroupItemSwitch]);

  return (
    <Box className={classes.root}>
      {data.map((groupItem) => (
        <Accordion key={`${groupItem.name}-${groupItem.id}`} className={classes.accordionWrap}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${groupItem.id}-content`}
            id={`${groupItem.id}-header`}
          >
            {(!isAdmin || groupItem.name === DEFAULT_WATCHLIST_GROUP_NAME) && (
              <Typography className={classes.header}>{groupItem.name}</Typography>
            )}
            {isAdmin && groupItem.name !== DEFAULT_WATCHLIST_GROUP_NAME && (
              <AdminField value={groupItem.name} handleRemoveClick={handleRemoveClick(groupItem)} handleEditClick={handleEditClick(groupItem)} disabled={disabled} />
            )}
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Grid container direction="column">
              {groupItem.watchlists.map((item) => (
                <Grid key={`${item.id}-${item.name}`} container item justifyContent="space-between" alignItems="center" className={classes.marginBottom10}>
                  {!isAdmin && (
                    <Grid xs={11} item>
                      <Typography className={classes.groupItemTitle} title={item.name}>
                        {item.name}
                      </Typography>
                    </Grid>
                  )}
                  {isAdmin && (
                    <Grid xs={11} item className={classes.paddingRight10}>
                      <AdminField
                        isItem
                        value={item.name}
                        handleRemoveClick={handleRemoveClick(groupItem, item.id)}
                        handleEditClick={handleOpenWatchlist(item)}
                        disabled={disabled}
                        isWatchlistError={!!item.process?.error}
                        isRunning={runningWatchlists.includes(item.id)}
                        handleRefreshClick={handleRefreshClick(item.id)}
                      />
                    </Grid>
                  )}
                  <Grid xs={1} item container justifyContent="flex-end" wrap="nowrap">
                    {!isAdmin && !!item.process?.error && (
                      <Box mr={1}>
                        <WarningBadge isDefaultPosition={false} />
                      </Box>
                    )}
                    <Switch
                      checked={item.checked}
                      onChange={handleOnChange(groupItem, item.id)}
                      color="primary"
                      disabled={runningWatchlists.includes(item.id) || !!item.process?.error}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export const AmlBasicWatchlistList = React.memo(AmlBasicWatchlistListComponent);
