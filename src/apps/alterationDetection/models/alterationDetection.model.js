const AlterationReasons = {
  'alterationDetection.digitalAlteration': 'SecurityCheckStep.alterationDetection.digitalAlteration.title',
  'alterationDetection.physicalAlteration': 'SecurityCheckStep.alterationDetection.physicalAlteration.title',
  'alterationDetection.invalidDocument': 'SecurityCheckStep.alterationDetection.invalidDocument.title',
};

export function getAlterationReason(step) {
  return {
    ...step,
    subtitle: step.error && step.error.code && AlterationReasons[step.error.code],
  };
}
