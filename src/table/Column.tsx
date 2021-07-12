import React, { useContext, useEffect } from 'react';
import { ColumnInfo } from './interfaces';
import { DefaultCellRenderer } from './Cell';
import { DefaultHeaderRenderer } from './Header';
import { TableContext } from './context';
import { toPascalCase } from './utils';
export type ColumnInfoProps = ColumnInfo;
export const Column = ({
  field,
  header = toPascalCase(field),
  cellRenderer = DefaultCellRenderer,
  headerRenderer = DefaultHeaderRenderer,
  sortable,
  comparator,
}: ColumnInfoProps) => {
  const { addColumn } = useContext(TableContext);

  useEffect(() => {
    if (addColumn) {
      addColumn({
        field,
        header,
        cellRenderer,
        headerRenderer,
        sortable,
        comparator,
      });
    }
  }, [
    addColumn,
    field,
    header,
    cellRenderer,
    headerRenderer,
    sortable,
    comparator,
  ]);
  return null;
};

export const CustomColumnsSetUp: React.FC<{
  setInitialized: React.DispatchWithoutAction;
}> = ({ setInitialized, children }) => {
  useEffect(() => {
    setInitialized();
  }, [setInitialized]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const DefaultColumnsSetUp = ({
  data,
  initialized,
  setInitialized,
  setColumns,
  tableIsSortable,
}: {
  data: Record<string, unknown>[];
  initialized: boolean;
  setInitialized: React.DispatchWithoutAction;
  setColumns: React.Dispatch<ColumnInfo[]>;
  tableIsSortable: boolean;
}) => {
  //iterate over data to identify columns
  useEffect(() => {
    if (!initialized) {
      const identifiedColumns: string[] = [];
      for (const record of data) {
        const recordKeys = Object.keys(record);
        for (const field of recordKeys) {
          if (!identifiedColumns.includes(field)) {
            identifiedColumns.push(field);
          }
        }
      }

      setColumns(
        identifiedColumns.map((field) => ({
          field,
          header: toPascalCase(field),
          cellRenderer: DefaultCellRenderer,
          headerRenderer: DefaultHeaderRenderer,
          sortable: tableIsSortable,
        }))
      );

      setInitialized();
    }
  }, [data, initialized, setColumns, setInitialized, tableIsSortable]);
  return null;
};
