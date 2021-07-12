import React from 'react';
import results from './test-results.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table, Column } from '../table';
import { withTests } from '@storybook/addon-jest';

export default {
  title: 'Table/Defaults',
  component: Table,
  decorators: [withTests({ results })],
  excludeStories: /^[a-z]/,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

const data = [
  { name: 'Ludo', age: 26, department: 'Software' },
  { name: 'Filip', age: 27, department: 'Product' },
  { name: 'Jon', age: 30, department: 'Software' },
  { name: 'Maura', age: 27, department: 'Legal' },
];

export const Basic = Template.bind({});
export const basicArgs = {
  data,
};

Basic.args = {
  ...basicArgs,
};

Basic.parameters = {
  jest: ['Table.default.basic.spec.tsx'],
};

Basic.storyName = 'Basic';

export const Sortable = Template.bind({});
export const sortableArgs = {
  data,
  sortable: true,
};

Sortable.args = {
  ...sortableArgs,
};

Sortable.parameters = {
  jest: ['Table.default.sortable.spec.tsx'],
};
