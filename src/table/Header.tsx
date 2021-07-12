import { ColumnInfo } from './interfaces';
import { Sort } from './Sort';

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
                sortable: sortable ?? false,
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

export const DefaultHeaderRenderer = ({ header, field }: ColumnInfo) => {
  return (
    <th key={`${field}${header}`}>
      <div>
        {header}
        {
          <Sort
            columnKey={field}
            onSort={(columnKey, order) => {
              console.log(`Sort column ${columnKey} with order ${order}`);
            }}
          />
        }
      </div>
    </th>
  );
};
