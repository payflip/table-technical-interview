import React from 'react';
import { ColumnInfo } from './interfaces';

export const TableContext = React.createContext<{
  addColumn: ((columnInfo: ColumnInfo) => void) | undefined;
  tableIsSortable: boolean | undefined;
}>({ addColumn: undefined, tableIsSortable: undefined });
