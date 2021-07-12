import { Basic, basicArgs } from './Table.custom.stories';
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

    it('should render 2 columns', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);
      const cells = getAllByRole('columnheader');

      //assert
      expect(cells.length).toBe(2);
    });

    it('should not render the "Age" column', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);
      const cells = getAllByRole('columnheader');

      //assert
      const ageHeaderCellExists = cells.some((cell) =>
        within(cell).queryByText('Age')
      );
      expect(ageHeaderCellExists).toBe(false);
    });

    it('should render the "Name" column', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);
      const cells = getAllByRole('columnheader');

      //assert
      const nameHeaderCellExists = cells.some((cell) =>
        within(cell).queryByText('Name')
      );
      expect(nameHeaderCellExists).toBe(true);
    });

    it('should render the "Department" column', () => {
      //act
      const { getAllByRole } = render(<Basic {...basicArgs} />);
      const cells = getAllByRole('columnheader');

      //assert
      const departmentHeaderCellExists = cells.some((cell) =>
        within(cell).queryByText('Department')
      );
      expect(departmentHeaderCellExists).toBe(true);
    });
  });
});
