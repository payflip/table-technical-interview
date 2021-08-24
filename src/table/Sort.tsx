import { useContext } from "react";
import { ReactComponent as UpArrowIcon } from '../assets/up-arrow-icon.svg';
import { ReactComponent as DownArrowIcon } from '../assets/down-arrow-icon.svg';
import styled from 'styled-components';
import type { SortDirection } from './interfaces';
import { SORTING } from "../constants/sorting";
import { SortContext } from "./context";
import { SortComparatorFn } from "./interfaces";
import { StyledButton } from "./StyledComponents";

const SortActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 1rem;
  cursor: pointer;
`;

export type SortProps = {
  columnKey: string;
  comparator?: SortComparatorFn;
};

export const Sort = ({ columnKey, comparator }: SortProps) => {
    const { setSortConfiguration, sortConfiguration } = useContext(SortContext)

    const { order, field } = sortConfiguration

    const onSort = (order: SortDirection) => {
      setSortConfiguration({field: columnKey, order, comparator})
    }

    const correctColumnHeader: boolean = field === columnKey

  return (
    <SortActionsContainer>
      <StyledButton
        selected={order === SORTING.ASC && correctColumnHeader}
        role="button"
        onClick={() => onSort(SORTING.ASC)}
      >
        <UpArrowIcon/>
      </StyledButton>
      <StyledButton
        selected={order === SORTING.DESC && correctColumnHeader}
        role="button"
        onClick={() => onSort(SORTING.DESC)}
      >
        <DownArrowIcon/>
      </StyledButton>
    </SortActionsContainer>
  );
};
