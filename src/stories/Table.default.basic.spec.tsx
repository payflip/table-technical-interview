import { Basic, basicArgs } from './Table.default.stories';
import { render, within } from '@testing-library/react';

describe('Table', () => {
  describe('in Basic state', () => {
    it('should render with empty array', () => {
      //arrange
      const data: Record<string, unknown>[] = [];

      //act
      const { getByRole } = render(<Basic {...basicArgs} data={data} />);

      //assert
      expect(getByRole('table')).toBeInTheDocument();
    });

    it('should render with non empty array', () => {
      //act
      const { getByRole } = render(<Basic {...basicArgs} />);

      //assert
      expect(getByRole('table')).toBeInTheDocument();
    });

    it('should render 4 rows', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);

      //assert
      expect(getAllByRole('row').length).toBe(4 + 1); //4 data rows + 1 header row
    });

    it('should render 3 columns', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);
      const cells = getAllByRole('columnheader');

      //assert
      expect(cells.length).toBe(3);
    });

    it('should not render sort actions', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);
      const rows = getAllByRole('row');
      const headerRow = rows[0];
      const actions = within(headerRow).queryAllByRole('button');

      //expect
      expect(actions.length).toBe(0);
    });
  });
});
