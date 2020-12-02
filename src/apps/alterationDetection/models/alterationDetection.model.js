export function getAlterationReason(step) {
  if (!(step.error && step.error.code)) {
    return step;
  }
  return {
    ...step,
    subtitle: `SecurityCheckStep.${step.error.code}.title`,
  };
}
