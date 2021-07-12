import React, { useCallback, useState } from 'react';
import { ColumnInfo, SortConfiguration } from './interfaces';
import { SortContextRead, SortContextWrite, TableContext } from './context';
import { HeadersRenderer } from './Header';
import { BodyRenderer } from './Body';
import { DefaultRowRenderer } from './Row';
import { CustomColumnsSetUp, DefaultColumnsSetUp } from './Column';
import { StyledTable } from './StyledComponents';

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
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [initialized, setInitialized] = useState(false);

  const addColumn = useCallback(
    (columnInfo: ColumnInfo) => {
      setColumns((columns) => [...columns, columnInfo]);
    },
    [setColumns]
  );

  //set-up phase
  if (!initialized) {
    if (children) {
      return (
        <TableContext.Provider
          value={{
            addColumn,
            tableIsSortable: sortable,
          }}
        >
          <CustomColumnsSetUp setInitialized={() => setInitialized(true)}>
            {children}
          </CustomColumnsSetUp>
        </TableContext.Provider>
      );
    } else {
      return (
        <DefaultColumnsSetUp
          data={data}
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
    <StyledTable className={className}>
      <HeadersRenderer columns={columns} />
      <BodyRenderer
        data={data}
        columns={columns}
        rowRenderer={DefaultRowRenderer(onRowClick)}
      />
    </StyledTable>
  );
};
