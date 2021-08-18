import React, { useCallback, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'apps/overlay';
import { Box, Button } from '@material-ui/core';
import { CheckboxGroup } from 'apps/ui';
import { CustomDocumentResponse } from 'models/CustomDocument.model';

export function VerificationStepsModal({
  documents = [],
  customDocuments = [],
  onSave,
  values,
  mode = 'both',
}: {
  documents?: string[];
  customDocuments?: CustomDocumentResponse[];
  onSave: (selectedOptions: string[]) => void;
  values: string[];
  mode?: 'regular' | 'custom' | 'both';
}) {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState(values);
  const verificationOptions = useMemo(() => {
    const regularOptions = ['both', 'regular'].includes(mode) ? documents.map((item) => ({
      label: intl.formatMessage({ id: `verification_items.${item}` }),
      value: item,
    })) : [];
    const customOptions = ['both', 'custom'].includes(mode) ? customDocuments.map((item) => ({
      label: item.name,
      value: item.type,
    })) : [];

    return [
      ...regularOptions,
      ...customOptions,
    ];
  }, [documents, customDocuments, intl, mode]);
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
