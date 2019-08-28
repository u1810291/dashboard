import React from 'react';
import { omit, get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import {
  usePopupState,
  bindToggle,
  bindPopper,
} from 'material-ui-popup-state/hooks';
import { saveConfiguration } from 'state/merchant';
import { default as useStyles } from './styles';
import { languages } from './langs';

const IntlButton = () => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState(null);
  const popupState = usePopupState({ variant: 'popper', popupId: 'langMenu' });
  const currentLang = useSelector(state => get(state, 'merchant.configuration.dashboard.language'));
  const dashboard = useSelector(state => get(state, 'merchant.configuration.dashboard'));
  const token = useSelector(state => get(state, 'auth.token'));
  const dispatch = useDispatch();

  const updateLanguage = language => {
    dispatch(saveConfiguration(token, 
      { dashboard: { ...dashboard, language }} 
    ))
    .then(result => {
      popupState.close();
    });
  };

  const popperModifiers = {
    flip: {
      enabled: true,
    },
    arrow: {
      enabled: Boolean(arrowRef),
      element: arrowRef,
    },
  };

  return (
    <>
      <IconButton
      disableRipple={true} 
      disableFocusRipple={true}
      className={classes.intlButton}
      variant="contained"
      {...bindToggle(popupState)}
    >
      { get(languages, `[${currentLang}].icon`) }
      </IconButton>
      <Popper 
        {...bindPopper(popupState)}
        className={classes.popper} 
        placement="bottom"
        transition
        modifiers={popperModifiers}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper>
              <List>
                { Object.entries(omit(languages, currentLang))
                  .map(([key, {label, icon}]) => (
                    <ListItem button dense onClick={updateLanguage.bind(this, key)} key={key}>
                      <ListItemAvatar className={classes.itemAvatar}>
                        <Avatar className={classes.avatar}>
                          {icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={label} />
                    </ListItem>
                  ))
                }
              </List>
              <span className={classes.arrow} ref={setArrowRef} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default IntlButton;
