import React from 'react';
import { ColumnInfo } from './interfaces';
import { StyledRow } from './StyledComponents';

export const DefaultRowRenderer =
  (onClickCallback?: (record: Record<string, unknown>) => void) =>
  (columnInfos: ColumnInfo[], record: Record<string, unknown>, key: string) =>
    (
      <StyledRow
        key={key}
        selectable
        onClick={() => {
          if (onClickCallback) {
            onClickCallback(record);
          }
        }}
      >
        {columnInfos.map(({ field, header, cellRenderer }, index) => {
          if (cellRenderer) {
            return cellRenderer({ field, header }, record, index);
          } else {
            return null;
          }
        })}
      </StyledRow>
    );
