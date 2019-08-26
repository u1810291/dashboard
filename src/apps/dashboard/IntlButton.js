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
import { saveConfiguration } from 'state/merchant'

import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as EnIcon } from './en.svg';
import { ReactComponent as EsIcon } from './es.svg';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
};

const useStyles = makeStyles(theme => ({
  intlButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  avatar: {
    height: 'auto',
    backgroundColor: 'transparent',
  },
  listItem: {
    paddingLeft: theme.spacing(1),
  },
  itemAvatar: {
    minWidth: 'auto'
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: {
    ...arrowGenerator('white'),
    'z-index': 10000
  }
}));

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

  const languages = {
    en: {
      label: 'English',
      icon: <EnIcon />
    },
    es: {
      label: 'Español',
      icon: <EsIcon />
    },
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
