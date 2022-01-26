/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, Checkbox } from '@material-ui/core';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { Modal, useOverlay } from 'apps/overlay';
import { TemplatesModal } from 'apps/SolutionCatalog/components/TemplatesModal/TemplatesModal';
import { useStyles, TableRowHovered } from './StepsCheckboxes.styles';
import { StartModal } from '../StartModal/StartModal';

export function StepsCheckboxes({ intl }) {
  const [createOverlay, closeOverlay] = useOverlay();
  const classes = useStyles();
  const handleTemplateModal = useCallback(() => {
    /*
      TODO: Maybe it is better to add prop for
      Modal size === auto ? style={{ width: 'auto', height: 'auto' }} : size
      and spread it inside div
    */
    closeOverlay();
    createOverlay(<TemplatesModal intl={intl} />);
  }, [intl, createOverlay, closeOverlay]);

  const handleBuildMetamap = useCallback(() => {
    createOverlay(
      <Modal
        style={{ width: '564px' }}
        title={intl.formatMessage({ id: 'StartModal.title' })}
        subtitle={intl.formatMessage({ id: 'StartModal.subtitle' })}
      >
        <StartModal intl={intl} action={handleTemplateModal} />
      </Modal>,
    );
  }, [intl, createOverlay, handleTemplateModal]);
  const MOCK_DATA = [
    { title: 'Get to know MetamMap', action: () => console.log('Get to know MetamMap') },
    { title: 'Set up your profile', action: () => console.log('Set up your profile') },
    { title: 'Invite a teammate', action: () => console.log('Invite a teammate') },
    { title: 'Complete profile authentication steps', action: () => console.log('Complete profile authentication steps') },
    { title: 'Build your first metamap', action: handleBuildMetamap },
  ];
  return (
    <Box mb={2}>
      <Typography variant="h3"> Complete these steps to get started </Typography>
      <Table className={classes.table}>
        <TableBody>
          {MOCK_DATA.length > 0 && MOCK_DATA.map((item, idx) => (
            <TableRowHovered
              hover
              key={idx}
              onClick={item.action}
            >
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color="common.black90">
                  <Box component="span">
                    <Checkbox color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                    <Box component="span" className={classes.itemName}>{item.title}</Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box component="span" className={classes.arrowContainer}>
                    <span className={classes.arrow} />
                  </Box>
                </Box>
              </TableCell>
            </TableRowHovered>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
