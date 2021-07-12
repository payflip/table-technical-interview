export type ColumnInfo = {
  field: string;
  sortable?: boolean;
  header?: string | JSX.Element;
  cellRenderer?: (
    columnInfo: Pick<ColumnInfo, 'field' | 'header'>,
    record: Record<string, unknown>,
    index: number
  ) => JSX.Element;
  headerRenderer?: (
    columnInfo: Pick<ColumnInfo, 'field' | 'header' | 'sortable' | 'comparator'>
  ) => JSX.Element;
  comparator?: SortComparatorFn;
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

export type SortDirection = 'ASC' | 'DESC';
