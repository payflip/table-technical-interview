import { ColumnInfo } from './interfaces';

export const BodyRenderer = ({
  data,
  columns,
  rowRenderer,
}: {
  data: Record<string, unknown>[];
  columns: ColumnInfo[];
  rowRenderer: (
    columnInfos: ColumnInfo[],
    record: Record<string, unknown>,
    key: string
  ) => JSX.Element;
}) => {
  return (
    <tbody>
      {data.map((record, index) => rowRenderer(columns, record, `${index}`))}
    </tbody>
  );
};
