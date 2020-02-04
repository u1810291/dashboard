import { Paper } from '@material-ui/core';
import DataTable from 'components/data-table';
import Details from 'components/details';
import Text from 'components/text';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as CheckBox } from './icon-check.svg';
import './MatiChecks.scss';

const prefix = 'fragments.verification_detail.mati_checks';

export default function MatiChecks() {
  const title = <FormattedMessage id={`${prefix}.title`} />;
  const getTypeString = (text) => (
    <Text color="darkergray">
      <CheckBox className="svg-blue icon-checked" />
      <FormattedMessage id={text} />
    </Text>
  );
  const getDescriptionString = (text) => (
    <Text color="darkergray">
      <FormattedMessage id={text} />
    </Text>
  );
  const columns = [
    {
      label: 'Type',
      content: (item) => item.type,
    },
    {
      label: 'Description',
      content: (item) => item.description,
    },
  ];

  const rows = [
    'liveness_check',
    'document_reading',
    'template_matching',
    'alteration_detection',
    'facematch',
    'watchlist',
    'curp',
  ].map((item) => ({
    type: getTypeString(`${prefix}.${item}.type`),
    description: getDescriptionString(`${prefix}.${item}.description`),
  }));

  const summaryProps = {
    size: '3',
    color: 'active',
  };

  return (
    <Paper>
      <Details
        summary={title}
        defaultOpened
        gap="0"
        cls="dialog-stripe"
        className="mati-checks background-white"
        summaryProps={summaryProps}
      >
        <DataTable
          rows={rows}
          columns={columns}
          inline
        />
      </Details>
    </Paper>
  );
}
