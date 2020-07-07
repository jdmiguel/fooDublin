import React from 'react';
import styled from 'styled-components';

import { HIGHLIGHTED_RESTAURANTS } from '../../../helpers/staticData';
import Title from '../../core/Title/Title';
import HighlightCard from '../../core/HighlightCard/HighlightCard';

const StyledHighlights = styled.div`
  margin-top: 50px;
  margin-bottom: 35px;
  @media only screen and (min-width: 1024px) {
    margin-top: 75px;
    padding: 0 30px;
  }
`;

const StyledHighlightWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;

const HighLights: React.FC = () => (
  <StyledHighlights className="grid-container">
    <Title text="Featured restaurants" />
    <StyledHighlightWrapper className="grid-x grid-margin-x">
      {HIGHLIGHTED_RESTAURANTS.map((restaurant) => (
        <HighlightCard
          key={restaurant.id}
          className="cell small-12 medium-6 large-4"
          imgSrc={restaurant.imgSrc}
          imgAlt={restaurant.name}
          title={restaurant.name}
          description={restaurant.description}
          linkText="visit website"
          linkUrl={restaurant.link}
        />
      ))}
    </StyledHighlightWrapper>
  </StyledHighlights>
);

export default HighLights;
