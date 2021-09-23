import { Grid } from '@material-ui/core';
import { agentHistoryCleanFilter, agentHistoryFilterStructure, allAgentHistoryActions } from 'models/History.model';
import { DeleteModal } from 'apps/collaborators/components/DeleteModal/DeleteModal';
import { collaboratorRemove } from 'apps/collaborators/state/collaborator.actions';
import { OpenFilter, useFilterParser, ByVerificationEventTypes } from 'apps/filter';
import { useOverlay } from 'apps/overlay';
import { ButtonHeaderMenu, notification } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiChevronLeft, FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { selectAgentHistoryFilter } from '../../state/agentHistory.selectors';
import { useStyles } from './AgentHistoryMenu.styles';

export function AgentHistoryMenu({ collaborator }) {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const [deleting, setDeleting] = useState(null);
  const { user } = collaborator || {};
  const agentHistoryFilter = useSelector(selectAgentHistoryFilter);
  const [, addToUrl] = useFilterParser(agentHistoryFilterStructure);
  const ownerId = useSelector(selectOwnerId);
  const isOwnerPage = useMemo(() => user?.id === ownerId, [ownerId, user?.id]);

  const handleRemove = useCallback((id) => {
    if (isOwnerPage) {
      return;
    }
    try {
      dispatch(collaboratorRemove(id));
      history.push(Routes.settings.root);
    } catch (error) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.remove.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, history, intl, isOwnerPage]);

  const handleRemoveSubmit = useCallback(async (id) => {
    try {
      closeOverlay();
      setDeleting(id);
      await handleRemove(id);

      notification.info(intl.formatMessage({ id: 'teamTable.deleteSuccess.description' }));
    } catch (error) {
      console.error(`can't remove collaborator: ${id}`, error);
    } finally {
      setDeleting(null);
    }
  }, [handleRemove, intl, closeOverlay]);

  const handleRemoveOverlay = useCallback(async (removingUser) => {
    createOverlay(<DeleteModal onSubmit={handleRemoveSubmit} user={removingUser} />);
  }, [handleRemoveSubmit, createOverlay]);

  return (
    <Grid container justify="space-between">
      <Grid item>
        {/* Back to settings */}
        <Grid item>
          <Link to={Routes.settings.root}>
            <ButtonHeaderMenu
              variant="contained"
              startIcon={<FiChevronLeft />}
              className={classes.buttonBack}
              data-qa={QATags.AgentHistory.GoBackButton}
            >
              {intl.formatMessage({ id: 'AgentHistory.button.goBackButton' })}
            </ButtonHeaderMenu>
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container>
          {/* Delete */}
          {collaborator && !isOwnerPage && (
            <Grid item className={classes.itemOffsetLeft}>
              <ButtonHeaderMenu
                variant="contained"
                onClick={() => handleRemoveOverlay(user)}
                startIcon={user.id === deleting ? <FiLoader /> : <FiTrash2 />}
                disabled={user.id === deleting}
                className={classes.deleteButton}
                data-qa={QATags.Collaborators.DeleteMemberButton}
              >
                {intl.formatMessage({ id: 'AgentHistory.button.deleteAgent' })}
              </ButtonHeaderMenu>
            </Grid>
          )}
          {/* Filter */}
          <Grid item className={classes.itemOffsetLeft}>
            <OpenFilter
              onSetFilter={addToUrl}
              selectFilter={agentHistoryFilter}
              cleanFilter={agentHistoryCleanFilter}
              qa={QATags.AgentHistory.FilterButton}
            >
              <ByVerificationEventTypes eventTypes={allAgentHistoryActions} />
            </OpenFilter>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
