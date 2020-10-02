import styled from 'styled-components';

import { Button } from '../../core/Button/Button';

import { fadeAnimation } from '../../../helpers/animations';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

export const StyledMain = styled.main`
  margin-bottom: 120px;
  padding: 0 10px;
  @media only screen and (min-width: 768px) {
    padding: 0 20px;
    margin-bottom: 80px;
  }
`;

export const StyledScrollUpButton = styled(Button)<{
  scrollUpButtonIsShowed: boolean;
  endValue: number;
}>`
  position: fixed;
  bottom: 1%;
  right: 4%;
  z-index: 1;
  display: ${({ scrollUpButtonIsShowed }) => !scrollUpButtonIsShowed && 'none'};
  ${fadeAnimation};
`;
