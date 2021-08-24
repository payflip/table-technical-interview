import React from 'react';
import results from './test-results.json';
import { ComponentMeta, Story } from '@storybook/react';

import { Table, Column } from '../table';
import { withTests } from '@storybook/addon-jest';

export default {
  title: 'Table/Custom',
  component: Table,
  decorators: [withTests({ results })],
  excludeStories: /^[a-z]/,
} as ComponentMeta<typeof Table>;

const data = [
  { name: 'Jon', age: 30, department: 'Software' },
  { name: 'Ludo', age: 26, department: 'Software' },
  { name: 'Filip', age: 27, department: 'Product' },
  { name: 'Maura', age: 27, department: 'Legal' },
];

export const Basic: Story<{ data: Record<string, unknown>[] }> = (args) => (
  <Table data={args.data}>
    <Column field="name" />
    <Column field="department" />
  </Table>
);
export const basicArgs = {
  data,
};

Basic.args = {
  ...basicArgs,
};

Basic.parameters = {
  jest: ['Table.custom.basic.spec.tsx'],
};

Basic.storyName = 'Basic';

export const TableIsSortableButColumnNot: Story<{
  data: Record<string, unknown>[];
  sortable: boolean;
}> = (args) => (
  <Table sortable={args.sortable} data={args.data}>
    <Column field="name" />
    <Column field="age" sortable={false} />
    <Column field="department" />
  </Table>
);
export const tableIsSortableButColumnNotArgs = {
  data,
  sortable: true,
};

TableIsSortableButColumnNot.args = {
  ...tableIsSortableButColumnNotArgs,
};

TableIsSortableButColumnNot.parameters = {
  jest: ['Table.custom.not-sortable-column.spec.tsx'],
};

export const ColumnHasCustomComparator: Story = () => (
  <Table data={data}>
    <Column
      field="name"
      sortable={true}
      comparator={(a, b, isInverted) => {
        if (a < b) {
          return isInverted ? 1 : -1;
        }

        if (a > b) {
          return isInverted ? -1 : 1;
        }

        return 0;
      }}
    />
  </Table>
);

ColumnHasCustomComparator.parameters = {
  jest: ['Table.custom.comparator.spec.tsx'],
};
