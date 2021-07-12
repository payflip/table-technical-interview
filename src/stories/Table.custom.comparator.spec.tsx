import { ColumnHasCustomComparator } from './Table.custom.stories';
import { fireEvent, render, within } from '@testing-library/react';

describe('Table', () => {
  describe('when the column has custom comparator', () => {
    let actions: HTMLElement[];
    let rows: HTMLElement[];

    beforeEach(() => {
      const { getAllByRole } = render(<ColumnHasCustomComparator />);
      rows = getAllByRole('row');
      const headerRow = rows[0];
      actions = within(headerRow).getAllByRole('button');
    });

    it('should sort in descending order with reverse custom logic', () => {
      //act
      fireEvent.click(actions[0]);

      ////fetch first column values
      const firstColumnCells = rows
        .map((row, index) => (index === 0 ? null : row.firstChild))
        .filter((value) => value !== null);
      const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

      //assert
      expect(texts.length).toBeGreaterThan(0);
      expect(texts).toEqual(['Maura', 'Ludo', 'Jon', 'Filip']);
    });

    it('should sort in ascending order with reverse custom logic', () => {
      //act
      fireEvent.click(actions[1]);

      ////fetch first column values
      const firstColumnCells = rows
        .map((row, index) => (index === 0 ? null : row.firstChild))
        .filter((value) => value !== null);
      const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

      //assert
      expect(texts.length).toBeGreaterThan(0);
      expect(texts).toEqual(['Filip', 'Jon', 'Ludo', 'Maura']);
    });
  });
});
