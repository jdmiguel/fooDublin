import React, { useReducer, Dispatch } from 'react';
import styled from 'styled-components';

type FilterData = {
  primaryText: string;
  secondaryText: string;
  icon: string;
  sort: 'cost' | 'rank';
  order: 'asc' | 'desc';
  id: number;
};

type FilterDataItemTypeWithIsActive = FilterData & { isActive: boolean };

type FilterProps = {
  className?: string;
  onSelect: (sort: string, order: string) => void;
  data: FilterData[];
};

type DataAction = { type: 'select'; id: number } | { type: 'clear' };

const StyledFilterWrapper = styled.div`
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  border-bottom: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
  padding: 20px 20px 10px;
  @media only screen and (min-width: 768px) {
    padding: 20px;
  }
  @media only screen and (min-width: 992px) {
    border: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
    border-radius: 4px;
  }
`;

const StyledFilterItem = styled.button<{ isActive: boolean }>`
  width: 144px;
  padding: 15px 8px;
  margin: 0 8px 15px;
  border: 1px solid ${(props) => props.theme.palette.DARK_MIN};
  background-color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  font-size: 0.9rem;
  color: ${(props) => props.theme.palette.DARK_MEDIUM};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: ${({ theme, isActive }) =>
    `${isActive ? theme.palette.PRIMARY_LIGHT : theme.palette.LIGHT_MEDIUM}`};

  @media only screen and (min-width: 400px) {
    width: 180px;
  }
  @media only screen and (min-width: 480px) {
    width: 200px;
    margin: 0 10px 15px;
  }
  @media only screen and (min-width: 680px) {
    width: 250px;
  }
  @media only screen and (min-width: 768px) {
    width: auto;
    margin: 0;
    padding: 15px;
    font-size: 1rem;
  }
  @media only screen and (min-width: 992px) {
    padding: 20px;
  }
`;

const StyledFilterPrimaryText = styled.span`
  text-transform: uppercase;
`;

const StyledFilterSecondaryText = styled.span`
  display: none;
  @media only screen and (min-width: 920px) {
    display: block;
  }
`;

const StyledFilterIcon = styled.i`
  font-size: 1.1rem;
  line-height: 18px;
  margin-left: 10px;
  display: block;
  @media only screen and (min-width: 920px) {
    display: none;
  }
`;

const dataReducer = (data: FilterData[], action: DataAction) => {
  switch (action.type) {
    case 'select':
      return data.map((dataItem) => ({
        ...dataItem,
        isActive: action.id === dataItem.id,
      }));
    case 'clear':
      return data.map((dataItem) => ({
        ...dataItem,
        isActive: false,
      }));
  }
};

const Filter: React.FC<FilterProps> = ({ onSelect, data, className }) => {
  const dataWithIsActiveProp = data.map((dataItem) => ({
    ...dataItem,
    isActive: false,
  }));
  const [dataState, dispatch]: [
    FilterDataItemTypeWithIsActive[],
    Dispatch<DataAction>,
  ] = useReducer(dataReducer, dataWithIsActiveProp);

  const handleSelect = (id: number, sort: string, order: string) => {
    dispatch({ type: 'select', id });
    onSelect && onSelect(sort, order);
  };

  const filterClasses = `${className || ''} grid-container`;

  return (
    <StyledFilterWrapper className={filterClasses}>
      <div className="grid-x grid-margin-x">
        {dataState.map((item: FilterDataItemTypeWithIsActive) => (
          <StyledFilterItem
            isActive={item.isActive}
            className="cell small-6 medium-3 large-3"
            key={item.id}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              handleSelect(item.id, item.sort, item.order);
            }}
          >
            <StyledFilterPrimaryText>
              {item.primaryText}
            </StyledFilterPrimaryText>
            <StyledFilterSecondaryText>
              {` ${item.secondaryText}`}
            </StyledFilterSecondaryText>
            <StyledFilterIcon className="material-icons">
              {item.icon}
            </StyledFilterIcon>
          </StyledFilterItem>
        ))}
      </div>
    </StyledFilterWrapper>
  );
};

export default Filter;
