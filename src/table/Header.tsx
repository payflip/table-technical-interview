import { ColumnInfo, IsColumnSortable } from './interfaces';
import { Sort } from './Sort';
import { useContext } from "react";
import { TableContext } from "./context";

const isColumnSortable = ({ sortable, comparator, tableIsSortable }: IsColumnSortable): boolean => {
  // If we have comparator prop, that means the user wants to make custom sort logic,
  // that's why we must show sort functionality
  if (comparator) {
    return true;
  }

  // default sortable value is UNDEFINED. If it isn't UNDEFINED, it means that the value
  // was overwritten by <Column> prop
  if (sortable !== undefined) {
    return sortable;
  }

  // if we dont have custom <Column> sortable value we use <Table> sort configuration
  return !!tableIsSortable;
}

export const HeadersRenderer = ({ columns }: { columns: ColumnInfo[] }) => {
  return (
    <thead>
      <tr>
        {columns.map(
          ({ header, field, headerRenderer, sortable, comparator }) => {
            if (headerRenderer) {
              return headerRenderer({
                header,
                field,
                sortable,
                comparator,
              });
            } else {
              return null;
            }
          }
        )}
      </tr>
    </thead>
  );
};

export const DefaultHeaderRenderer = (props: ColumnInfo) => {
    const { header, field, sortable, comparator } = props;
    const { tableIsSortable } = useContext(TableContext);

    const isSortable: boolean = isColumnSortable({ sortable, comparator, tableIsSortable });

    const sortIcons = isSortable && (
      <Sort
        columnKey={field}
        comparator={comparator}
      />
    )

  return (
    <th key={`${field}${header}`}>
      <div>
        {header}
        {sortIcons}
      </div>
    </th>
  );
};
