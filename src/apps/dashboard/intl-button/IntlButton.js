import React, { useRef, useEffect } from 'react';
import { omit, get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  IconButton,
  Popper,
  Fade,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import {
  usePopupState,
  bindToggle,
  bindPopper,
} from 'material-ui-popup-state/hooks';

import { saveConfiguration } from 'state/merchant';
import useStyles from './styles';
import languages from './langs';

function useOutsideAlerter(ref, popupState) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      event.stopImmediatePropagation();
      popupState.close();
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

const IntlButton = () => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState(null);
  const popupState = usePopupState({ variant: 'popper', popupId: 'langMenu' });
  const currentLang = useSelector((state) => get(state, 'merchant.configuration.dashboard.language'));
  const dashboard = useSelector((state) => get(state, 'merchant.configuration.dashboard'));
  const token = useSelector((state) => get(state, 'auth.token'));
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, popupState);

  const updateLanguage = async (language) => {
    await dispatch(saveConfiguration(token,
      { dashboard: { ...dashboard, language } },
    ));
    popupState.close();
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
        disableRipple
        disableFocusRipple
        className={classes.intlButton}
        variant="contained"
        {...bindToggle(popupState)} // eslint-disable-line react/jsx-props-no-spreading
      >
        { get(languages, `[${currentLang}].icon`) }
      </IconButton>
      <Popper
        {...bindPopper(popupState)} // eslint-disable-line react/jsx-props-no-spreading
        className={classes.popper}
        placement="bottom"
        transition
        modifiers={popperModifiers}
      >
        {({ TransitionProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Fade {...TransitionProps} timeout={200}>
            <Paper ref={wrapperRef}>
              <List>
                { Object.entries(omit(languages, currentLang))
                  .map(([key, { label, icon }]) => (
                    <ListItem button dense onClick={updateLanguage(key)} key={key}>
                      <ListItemAvatar className={classes.itemAvatar}>
                        <Avatar className={classes.avatar}>
                          {icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={label} />
                    </ListItem>
                  ))}
              </List>
              <span className={classes.arrow} ref={setArrowRef} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default IntlButton;
