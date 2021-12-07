import { Grid } from '@material-ui/core';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { Collaborator, UserId } from 'models/Collaborator.model';
import { collaboratorRemove } from 'apps/collaborators/state/collaborator.actions';
import { OpenFilter, useFilterParser, ByAgentEventGroups } from 'apps/filter';
import { ButtonHeaderMenu, notification } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useState } from 'react';
import { FiChevronLeft, FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { selectAgentHistoryFilter } from '../../state/agentHistory.selectors';
import { useStyles } from './AgentHistoryMenu.styles';
import { agentHistoryCleanFilter, agentHistoryEventGroups, agentHistoryFilterStructure } from '../../models/AgentHistory.model';

export function AgentHistoryMenu({ collaborator }: {
  collaborator: Collaborator;
}) {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState<UserId>(null);
  const { user } = collaborator || {};
  const agentHistoryFilter = useSelector(selectAgentHistoryFilter);
  const [, addToUrl] = useFilterParser(agentHistoryFilterStructure);
  const ownerId = useSelector(selectOwnerId);
  const isOwnerPage: boolean = user?.id === ownerId;

  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: 'teamTable.deleteModal.title' }),
    intl.formatMessage({ id: 'teamTable.deleteModal.subtitle' }),
  );

  const handleRemove = useCallback((id: UserId) => async () => {
    if (isOwnerPage) {
      return;
    }
    try {
      setDeleting(id);
      await confirmDelete();
      dispatch(collaboratorRemove(id));
      history.push(Routes.settings.root);
      notification.info(intl.formatMessage({ id: 'teamTable.deleteSuccess.description' }));
    } catch (error) {
      if (!error) {
        return; // deletion cancelled
      }
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.remove.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    } finally {
      setDeleting(null);
    }
  }, [dispatch, history, intl, isOwnerPage, confirmDelete]);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        {/* Back to settings */}
        <Grid item>
          <Link to={Routes.settings.root}>
            <ButtonHeaderMenu
              variant="contained"
              startIcon={<FiChevronLeft />}
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
                onClick={handleRemove(user.id)}
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
              <ByAgentEventGroups eventGroups={agentHistoryEventGroups} />
            </OpenFilter>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
