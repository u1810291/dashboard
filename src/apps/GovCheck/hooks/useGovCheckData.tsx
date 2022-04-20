import React from 'react';
import has from 'lodash/has';
import Grid from '@material-ui/core/Grid';
import { CheckStepDetailsEntry } from 'apps/checks';
import { govCheckDisplayOptions, GovCheckIStep } from '../models/GovCheck.model';
import { CheckStepDetailsEntryPDF } from '../../pdf/components/CheckStepPDF/CheckStepDetailsEntryPDF';

export const useGovCheckData = (step: GovCheckIStep, isPDF: boolean) => {
  let stepDataEntries = [];
  let data = { ...step.data };
  if (step.data) {
    const displayOption = (step.data?.subStepId ? govCheckDisplayOptions[step.id][step.data.subStepId] : govCheckDisplayOptions[step.id]) || {};
    stepDataEntries = Object.keys(displayOption).map((entry) => {
      if (displayOption[entry]?.formatter) {
        data = displayOption[entry].formatter(data[entry], data);
      }
      const value = data[entry];
      const dependentFieldForFailedCheck = data[displayOption[entry]?.dependentFieldForFailedCheck];
      delete data[entry];
      if (displayOption[entry].hidden || (displayOption[entry].hiddenIfNotExists && !value)) {
        return null;
      }
      if (has(displayOption[entry], 'hideIsField') && displayOption[entry].hideIsField === step.data[displayOption[entry].filedCondition]) {
        return null;
      }
      const props = {
        label: entry,
        value: value ?? '—',
        key: entry,
        isMarkedAsFailed: !!displayOption[entry].dependentFieldForFailedCheck && dependentFieldForFailedCheck !== true,
      };
      return (
        isPDF ? (
          <CheckStepDetailsEntryPDF {...props} />
        ) : (
          <Grid xs={displayOption[entry].inline ? 6 : 12} item>
            <CheckStepDetailsEntry
              isCentered={displayOption[entry].isCentered}
              {...props}
            />
          </Grid>
        )
      );
    });
    stepDataEntries = stepDataEntries.concat(Object.entries(data).map(([key, value]) => {
      const props = {
        label: key,
        value,
        key,
      };
      return isPDF ? <CheckStepDetailsEntryPDF {...props} /> : <CheckStepDetailsEntry {...props} />;
    }));
  }

  return stepDataEntries;
};
