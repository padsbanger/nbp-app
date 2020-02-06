export interface Currency {
  currency: string;
  code: string;
  mid: number;
}

export interface TablesReducerState {
  loading: Boolean;
  progress: number;
  tables: Currency[];
}
