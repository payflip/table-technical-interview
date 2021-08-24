import Colors from '../constants/colors';
import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
  thead {
    text-align: left;
    color: ${Colors.$grey50};
    font-weight: 400;
    th {
      font-weight: inherit;
      padding: 1rem 1rem 1rem 0;
      & > div {
        display: flex;
        align-items: center;
      }
    }
  }

  tbody {
    tr {
      vertical-align: middle;
    }
  }
`;

export const StyledCell = styled.td<{
  emphasized?: boolean;
  align?: 'center' | 'right' | 'left';
}>`
  padding: 1rem 1rem 1rem 0;
  font-weight: ${({ emphasized }: { emphasized?: boolean }) =>
    emphasized ? 600 : 400};
  text-align: ${({ align = 'left' }) => align};
`;

export const StyledRow = styled.tr<{ borders?: boolean; selectable?: boolean }>`
  cursor: ${({ selectable: cursor = false }) =>
    cursor ? 'pointer' : 'inherit'};
  &:hover {
    background-color: ${Colors.$lightGrey};
  }
  td {
    border-bottom: ${({ borders = false }) =>
      borders ? `1px solid ${Colors.$grey10}` : 'none'};
  }
`;

export const StyledButton = styled.button<{ selected?: boolean }>`
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  stroke: ${({ selected }) =>
      selected ? Colors.$grey100 : Colors.$grey10
}`;
