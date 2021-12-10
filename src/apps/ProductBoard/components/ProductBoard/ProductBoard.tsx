import React, { useCallback, useEffect, useState } from 'react';
import { PageLoader } from 'apps/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { Box, IconButton, useMediaQuery } from '@material-ui/core';
import { FiHelpCircle } from 'react-icons/fi';
import { SupportedLocaleToFullLocale } from 'models/Intl.model';
import { getProductBoardToken } from '../../state/ProductBoard.actions';
import { selectProductBoardModel, selectProductBoardModelValue } from '../../state/ProductBoard.selectors';
import { getIframeSrc, ProductBoardIframeLinkByLocale, PRODUCT_BOARD_IFRAME_ID } from '../../model/ProductBoard.model';
import { ProductBoardSidebar } from '../ProductBoardSidebar/ProductBoardSidebar';
import { useStyles } from './ProductBoard.styles';

export function ProductBoard() {
  const token = useSelector(selectProductBoardModelValue);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const intl = useIntl();
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:768px)', { noSsr: true });
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(true);

  const productBoardTokenModel = useSelector(selectProductBoardModel);
  const iframeSrc = getIframeSrc(ProductBoardIframeLinkByLocale[intl.locale], token);

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };

  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  useEffect(() => {
    dispatch(getProductBoardToken(SupportedLocaleToFullLocale[intl.locale]));
  }, [dispatch, intl.locale]);

  const handleIframeClick = () => {
    if (document.activeElement.id === PRODUCT_BOARD_IFRAME_ID) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('blur', handleIframeClick);

    return () => {
      window.removeEventListener('blur', handleIframeClick);
    };
  }, []);

  return (
    <Box position="relative" height="100%">
      <Box className={classnames(classes.loaderContainer, {
        [classes.loaderContainerHidden]: isIframeLoaded,
        [classes.iframeOpen]: open,
        [classes.iframeClosed]: !open,
        [classes.iframeOpenMobile]: !isDesktop,
      })}
      >
        <PageLoader />
      </Box>
      {!isDesktop && (
      <Box height="40px" display="flex" justifyContent="flex-end">
        <IconButton onClick={toggleDrawer}><FiHelpCircle size={17} /></IconButton>
      </Box>
      )}
      {(productBoardTokenModel.isLoaded || productBoardTokenModel.isFailed) && (
        <iframe
          id={PRODUCT_BOARD_IFRAME_ID}
          title="productBoard"
          src={iframeSrc}
          frameBorder="0"
          height="100%"
          className={classnames({
            [classes.iframeOpen]: open,
            [classes.iframeClosed]: !open,
            [classes.iframeOpenMobile]: !isDesktop,
          })}
          onLoad={handleIframeLoad}
        />
      )}
      <ProductBoardSidebar toggleDrawer={toggleDrawer} open={open} />
    </Box>
  );
}
