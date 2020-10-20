export function getTemplateMatchingStepExtraData(step, identity, countries = [], document) {
  const found = countries.find(({ code }) => code === document.country);
  const countryName = found ? found.name : document.country;
  const country = [countryName, document.region].filter((e) => !!e).join(', ');
  return {
    ...step,
    labelExtraData: {
      country,
    },
  };
}
