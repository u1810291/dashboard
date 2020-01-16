import React from 'react';
import { Items, H1 } from 'components';

const LOGOS = [
  'allianz',
  'coinbtr',
  'dopla',
  'pretmex',
  'profuturo',
  'usados',
// eslint-disable-next-line global-require,import/no-dynamic-require
].map((name) => require(`./logos/${name}.svg`));

export function CompaniesUsingMati() {
  return (
    <Items flow="row" justifyItems="center" gap={4}>
      <H1>200+ companies are already compliant with mati</H1>
      <Items gap="4" align="center">
        {LOGOS.map((url) => (
          <img src={url} alt="" key={url} />
        ))}
      </Items>
    </Items>
  );
}
