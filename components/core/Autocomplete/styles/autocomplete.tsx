import styled from 'styled-components';

import { Input } from '../../Input/Input';
import { Loader } from '../../Loader/Loader';

export const StyledAutocomplete = styled.div`
  width: 100%;
  max-width: 550px;
  height: 55px;
  position: relative;
  cursor: pointer;
`;

export const StyledInput = styled(Input)<{ hasBorderBottomRadius: boolean }>`
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }

  ${({ hasBorderBottomRadius }) =>
    !hasBorderBottomRadius &&
    `border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;`}
`;

export const StyledListboxWrapper = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transform: translateY(${({ isShowed }) => (isShowed ? '0' : '10px')});
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
  position: absolute;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  z-index: 2;
  top: 55px;
  left: 0;
  padding: 0;
  width: 100%;
  height: auto;
  max-height: 400px;
  overflow: auto;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  border-radius: 0 0 4px 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 0;
`;

export const StyledLoader = styled(Loader)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

export const StyledListbox = styled.ul`
  width: 100%;
  -webkit-tap-highlight-color: transparent;
`;

export const StyledListboxItem = styled.li`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_MIN};
  list-style: none;
  display: flex;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  transition: background-color 0.2s ease-out;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
`;
