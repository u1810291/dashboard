export enum GDPRRangeTypes {
  From = 1,
  To = 1096,
}

export enum GDPRUnitTypes{
  Day = 'DAY',
  MONTH = 'MONTH'
}

export interface GDPRSettings{
  interval: string;
  unit: GDPRUnitTypes;
}
