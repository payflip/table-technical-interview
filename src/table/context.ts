import React from 'react';
import { ColumnInfo, SortConfiguration } from './interfaces';

export const TableContext = React.createContext<{
  addColumn?: ((columnInfo: ColumnInfo) => void);
  tableIsSortable?: boolean;
}>({ addColumn: undefined, tableIsSortable: undefined });

export const SortContext = React.createContext<{
  setSortConfiguration: (props: SortConfiguration) => void
  sortConfiguration: SortConfiguration
}>({
  setSortConfiguration: () => {},
  sortConfiguration: {},
});
