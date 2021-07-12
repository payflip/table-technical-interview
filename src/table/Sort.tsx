import { ReactComponent as UpArrowIcon } from '../assets/up-arrow-icon.svg';
import { ReactComponent as DownArrowIcon } from '../assets/down-arrow-icon.svg';
import styled from 'styled-components';
import type { SortDirection } from './interfaces';

const SortActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 1rem;
  cursor: pointer;
`;

export type SortProps = {
  columnKey: string;
  onSort: (columnKey: string, direction: SortDirection) => void;
};

export const Sort = ({ onSort, columnKey }: SortProps) => {
  return (
    <SortActionsContainer>
      <UpArrowIcon role="button" onClick={() => onSort(columnKey, 'ASC')} />
      <DownArrowIcon role="button" onClick={() => onSort(columnKey, 'DESC')} />
    </SortActionsContainer>
  );
};
