export type BasicWatchlistIdType = number;

export interface IPremiumAmlWatchlists {
    fuzzinessThreshold: number;
    countryCodes: string[];
}

export const DEFAULT_AML_FUZZINESS_THRESHOLD = 50;

export const premiumAmlWatchlistsInitialValue = {
  fuzzinessThreshold: DEFAULT_AML_FUZZINESS_THRESHOLD,
  countryCodes: [],
};
