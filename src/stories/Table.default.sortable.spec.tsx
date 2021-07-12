import { Sortable, sortableArgs } from './Table.default.stories';
import { fireEvent, render, within } from '@testing-library/react';

describe('Table', () => {
  describe('in Sortable state', () => {
    it('should render sort actions for all the columns', () => {
      //act
      const { getAllByRole } = render(<Sortable {...sortableArgs} />);
      const rows = getAllByRole('row');
      const headerRow = rows[0];
      const actions = within(headerRow).queryAllByRole('button');

      //expect
      expect(actions.length).toBe(6);
    });

    describe('should sort the "Name" column', () => {
      let actions: HTMLElement[];
      let rows: HTMLElement[];

      beforeEach(() => {
        const { getAllByRole } = render(<Sortable {...sortableArgs} />);
        rows = getAllByRole('row');
        const headerRow = rows[0];
        actions = within(headerRow).getAllByRole('button');
      });

      test('in ascending order', () => {
        //act
        fireEvent.click(actions[0]);

        ////fetch first column values
        const firstColumnCells = rows
          .map((row, index) => (index === 0 ? null : row.firstChild))
          .filter((value) => value !== null);
        const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

        //assert
        expect(texts.length).toBeGreaterThan(0);
        expect(texts).toBeSorted();
      });

      test('in descending order', () => {
        //act
        fireEvent.click(actions[1]);

        ////fetch first column values
        const firstColumnCells = rows
          .map((row, index) => (index === 0 ? null : row.firstChild))
          .filter((value) => value !== null);
        const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

        //assert
        expect(texts.length).toBeGreaterThan(0);
        expect(texts).toBeSorted({ descending: true });
      });
    });

    describe('should sort the "Age" column', () => {
      let actions: HTMLElement[];
      let rows: HTMLElement[];

      beforeEach(() => {
        const { getAllByRole } = render(<Sortable {...sortableArgs} />);
        rows = getAllByRole('row');
        const headerRow = rows[0];
        actions = within(headerRow).getAllByRole('button');
      });

      test('in ascending order', () => {
        //act
        fireEvent.click(actions[2]);

        ////fetch first column values
        const firstColumnCells = rows
          .map((row, index) => (index === 0 ? null : row.children[1]))
          .filter((value) => value !== null);
        const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

        //assert
        expect(texts.length).toBeGreaterThan(0);
        expect(texts).toBeSorted();
      });

      test('in descending order', () => {
        //act
        fireEvent.click(actions[3]);

        ////fetch first column values
        const firstColumnCells = rows
          .map((row, index) => (index === 0 ? null : row.children[1]))
          .filter((value) => value !== null);
        const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

        //assert
        expect(texts.length).toBeGreaterThan(0);
        expect(texts).toBeSorted({ descending: true });
      });
    });

    describe('should sort the "Department" column', () => {
      let actions: HTMLElement[];
      let rows: HTMLElement[];

      beforeEach(() => {
        const { getAllByRole } = render(<Sortable {...sortableArgs} />);
        rows = getAllByRole('row');
        const headerRow = rows[0];
        actions = within(headerRow).getAllByRole('button');
      });

      test('in ascending order', () => {
        //act
        fireEvent.click(actions[4]);

        ////fetch first column values
        const firstColumnCells = rows
          .map((row, index) => (index === 0 ? null : row.children[2]))
          .filter((value) => value !== null);
        const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

        //assert
        expect(texts.length).toBeGreaterThan(0);
        expect(texts).toBeSorted();
      });

      test('in descending order', () => {
        //act
        fireEvent.click(actions[5]);

        ////fetch first column values
        const firstColumnCells = rows
          .map((row, index) => (index === 0 ? null : row.children[2]))
          .filter((value) => value !== null);
        const texts: any[] = firstColumnCells.map((cell) => cell?.textContent);

        //assert
        expect(texts.length).toBeGreaterThan(0);
        expect(texts).toBeSorted({ descending: true });
      });
    });
  });
});
