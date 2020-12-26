import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'apps/overlay';
import { Box, Button } from '@material-ui/core';
import { CheckboxGroup } from 'apps/ui';

export function VerificationStepsModal({ items, onSave, values }) {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState(values);
  const verificationOptions = items.map((item) => ({
    label: intl.formatMessage({ id: `verification_items.${item}` }),
    value: item,
  }));
  const handleCheckboxGroupChange = useCallback((newValues) => {
    setSelectedOptions(newValues);
  }, [setSelectedOptions]);
  const handleSave = useCallback(() => {
    onSave(selectedOptions);
  }, [onSave, selectedOptions]);

  return (
    <Modal>
      <main>
        <Box mb={2}>
          <h1>
            {intl.formatMessage({ id: 'fragments.configuration.verification_steps_modal.title' })}
            <p>
              {intl.formatMessage({ id: 'fragments.configuration.verification_steps_modal.subtitle' })}
            </p>
          </h1>
        </Box>
        <CheckboxGroup
          items={verificationOptions}
          values={selectedOptions}
          onChange={handleCheckboxGroupChange}
        />
      </main>
      <footer>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disabled={!selectedOptions.length}
          onClick={handleSave}
        >
          {intl.formatMessage({ id: 'done' })}
        </Button>
      </footer>
    </Modal>
  );
}

VerificationStepsModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.string),
};

VerificationStepsModal.defaultProps = {
  items: [],
  onSave: () => {},
  values: [],
};
