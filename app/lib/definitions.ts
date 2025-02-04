export type Country = {
  name: {
    common: string;
  };
  region: string;
  subregion?: string;
  population: number;
  area: number;
  unMember: boolean;
  independent: boolean;
  flags: {
    svg: string;
  }
}
