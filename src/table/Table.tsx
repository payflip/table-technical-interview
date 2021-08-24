import React, { useCallback, useEffect, useState } from 'react';
import { ColumnInfo, SortConfiguration } from './interfaces';
import { SortContext, TableContext } from './context';
import { HeadersRenderer } from './Header';
import { BodyRenderer } from './Body';
import { DefaultRowRenderer } from './Row';
import { CustomColumnsSetUp, DefaultColumnsSetUp } from './Column';
import { StyledTable } from './StyledComponents';
import { SORTING } from "../constants/sorting";

export type TableProps<TData = Record<string, unknown>[]> = {
  data: TData;
  onRowClick?: (record: Record<string, unknown>) => void;
  className?: string;
  sortable?: boolean;
};

/*

  The table component displays the list of items provided in the 'data' prop.
  It builds a column per field encountered in the item.

  e.g.: [                              | name | age |
          {name: 'Jon', age: 30},  =>   ------------
          {name: 'Ludo', age: 26}  =>  | Ludo | 26  |
        ]                              | Jon  | 30  |

  To display the rows, the table goes through two phases, the 'set up' phase and the 'display' phase

  SET UP:
  The 'set up' phase is used to define the columns that will be displayed.
  The table can be set up with two different modes: 'default' and 'custom'

  If you don't provide any configuration in the form of <Column/> components to the <Table/> component, the table set up itself using the 'default' mode.
  If you provide some <Column/> components as children to the <Table/> component, the table uses the 'custom' mode
  
  DISPLAY:
  Once the 'set up' phase is done, the table simply displays the columns that were configured during the previous phase.
*/

export const Table: React.FC<TableProps> = ({
      data = [],
      children,
      onRowClick,
      className,
      sortable,
  }) => {
    const [sortedData, setSortedData] = useState<Record<string, unknown>[]>(data);
    const [columns, setColumns] = useState<ColumnInfo[]>([]);
    const [initialized, setInitialized] = useState(false);
    const [sortConfiguration, setSortConfiguration] = useState<SortConfiguration>({});

    useEffect(() => {
      const {field, order, comparator} = sortConfiguration as SortConfiguration

      if (field) {
        const updatedData: TableProps["data"] = [...data].sort((a, b) => {
          const valueA: any = a[field]
          const valueB: any = b[field]

          if (comparator) {
            return comparator(valueA, valueB, order === SORTING.ASC)
          }

          if (valueA > valueB) {
            return order === SORTING.ASC ? 1 : -1;
          }
          if (valueA < valueB) {
            return order === SORTING.ASC ? -1 : 1;
          }
          return 0;
        })

        setSortedData(updatedData)
      }
    }, [sortConfiguration])

    const addColumn = useCallback(
      (columnInfo: ColumnInfo) => {
        setColumns((columns) => [...columns, columnInfo]);
      },
      [setColumns]
    );

  const tableContextValue = {
    addColumn,
    tableIsSortable: sortable,
  }
  const sortContextValue = {
    setSortConfiguration,
    sortConfiguration
  }

    //set-up phase
    if (!initialized) {
      if (children) {
        return (
          <TableContext.Provider
            value={tableContextValue}
          >
            <CustomColumnsSetUp setInitialized={() => setInitialized(true)}>
              {children}
            </CustomColumnsSetUp>
          </TableContext.Provider>
        );
      } else {
        return (
          <DefaultColumnsSetUp
            data={sortedData}
            setColumns={setColumns}
            initialized={initialized}
            tableIsSortable={sortable ?? false}
            setInitialized={() => setInitialized(true)}
          />
        );
      }
    }

    //display
    return (
      <TableContext.Provider
        value={tableContextValue}
      >
        <SortContext.Provider
          value={sortContextValue}
        >
          <StyledTable className={className}>
            <HeadersRenderer columns={columns}/>
            <BodyRenderer
              data={sortedData}
              columns={columns}
              rowRenderer={DefaultRowRenderer(onRowClick)}
            />
          </StyledTable>
        </SortContext.Provider>
      </TableContext.Provider>
    );
};
