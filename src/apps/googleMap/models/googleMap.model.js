import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { localeNumber } from '../../../lib/number';

export const GOOGLE_MAP_REQUIRED_CONTAINER_ID = 'map';
export const UNKNOWN_COUNTRY_CODE = 'N/A';

export const InformationSourceTypes = {
  Documents: 'byDocuments',
  IpCheck: 'byIpCheck',
};

export const InformationSources = [
  {
    id: InformationSourceTypes.Documents,
    icon: <FiFileText />,
  },
  // TODO @grigorev add LocationIntelligence
  // {
  //   id: InformationSourceTypes.LocationIntelligence,
  //   icon: <FiMapPin />,
  // },
];

export function getGeoStatisticsLabel(percentage, count) {
  return `${percentage}%(${localeNumber(count)})`;
}

export function changeCountriesStructureForCountriesControl(countries) {
  const filtered = countries.filter((item) => item.documentCountry !== null && item.documentCountry !== UNKNOWN_COUNTRY_CODE);
  const totalCount = filtered.reduce((sum, country) => sum + country.count, 0) || 1;
  return filtered.map((item) => ({
    code: item.documentCountry,
    percentage: Math.floor((item.count / totalCount) * 100),
    count: item.count,
  }));
}
