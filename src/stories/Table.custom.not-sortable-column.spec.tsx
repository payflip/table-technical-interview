import {
  TableIsSortableButColumnNot,
  tableIsSortableButColumnNotArgs,
} from './Table.custom.stories';
import { render, within } from '@testing-library/react';

describe('Table', () => {
  describe("when the 'sortable' column property is specified", () => {
    it("should override table's configuration", () => {
      //act
      const { getAllByRole } = render(
        <TableIsSortableButColumnNot {...tableIsSortableButColumnNotArgs} />
      );
      const rows = getAllByRole('row');
      const headerRow = rows[0];
      const ageHeaderCell = within(headerRow).getByText('Age');
      const ageActions = within(ageHeaderCell).queryAllByRole('button');

      //expect
      expect(ageActions.length).toBe(0);
    });
  });
});
