/* eslint-disable no-console */
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { Modal, useOverlay } from 'apps/overlay';
import { TemplatesModal } from 'apps/SolutionCatalog/components/TemplatesModal/TemplatesModal';
import { useFormatMessage } from 'apps/intl';
import { StartModal } from '../StartModal/StartModal';
import { useStyles, TableRowHovered } from './StepsCheckboxes.styles';

export function StepsCheckboxes() {
  const [createOverlay, closeOverlay] = useOverlay();
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const handleTemplateModal = useCallback(() => {
    /*
      TODO: Maybe it is better to add prop for
      Modal size === auto ? style={{ width: 'auto', height: 'auto' }} : size
      and spread it inside div
    */
    closeOverlay();
    createOverlay(<TemplatesModal />);
  }, [createOverlay, closeOverlay]);

  const handleMetamapBuild = () => {
    createOverlay(
      <Modal
        className={classes.startModal}
        title={formatMessage('StartModal.title')}
        subtitle={formatMessage('StartModal.subtitle')}
      >
        <StartModal action={handleTemplateModal} />
      </Modal>,
    );
  };

  const MOCK_DATA = [
    { title: 'Get to know MetamMap', action: () => console.log('Get to know MetamMap') },
    { title: 'Set up your profile', action: () => console.log('Set up your profile') },
    { title: 'Invite a teammate', action: () => console.log('Invite a teammate') },
    { title: 'Complete profile authentication steps', action: () => console.log('Complete profile authentication steps') },
    { title: 'Build your first metamap', action: handleMetamapBuild },
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
