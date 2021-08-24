import { SORTING } from "../constants/sorting";

export type ColumnInfo = {
  field: string;
  sortable?: boolean;
  header?: string | JSX.Element;
  cellRenderer?: (
    columnInfo: Pick<ColumnInfo, 'field' | 'header'>,
    record: Record<string, unknown>,
    index: number
  ) => JSX.Element;
  comparator?: SortComparatorFn;
  headerRenderer?: (columnInfo: Pick<ColumnInfo, 'field' | 'header' | 'sortable' | 'comparator'>) => JSX.Element
};

export type SortComparatorFn = (
  previous: any,
  next: any,
  isInverted: boolean
) => -1 | 1 | 0;
export type SortConfiguration = {
  field?: string;
  order?: SortDirection;
  comparator?: SortComparatorFn;
};

export type SortDirection = SORTING.ASC | SORTING.DESC;

export type IsColumnSortable = {
  sortable?: boolean,
  comparator?: SortComparatorFn
  tableIsSortable?: boolean
}
