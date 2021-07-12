import React from 'react';
import { ColumnInfo } from './interfaces';
import { StyledCell } from './StyledComponents';
import { get } from './utils';

export const DefaultCellRenderer = (
  { field, header }: ColumnInfo,
  record: Record<string, unknown>,
  index: number
) => (
  <StyledCell key={`${field}${header}${index}`}>
    {get(field, record)}
  </StyledCell>
);

export const CurrencyCellRenderer = (
  { field, header }: ColumnInfo,
  record: Record<string, unknown>,
  index: number
) => (
  <StyledCell key={`${field}${header}${index}`}>
    € {get(field, record)}
  </StyledCell>
);
