import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import HomePage from '../components/HomePage/HomePage';

import { setRelatedRestaurants } from '../store/actions';

import { HIGHLIGHTED_RESTAURANTS } from '../helpers/staticData';
import { getCurrentRelatedRestaurants } from '../helpers/utils';

const index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClickHightlightCard = (id: string) => {
    setIsLoading(true);

    const currentRelatedRestaurants = getCurrentRelatedRestaurants(
      HIGHLIGHTED_RESTAURANTS,
      id,
    );
    dispatch(setRelatedRestaurants(currentRelatedRestaurants));
  };

  return (
    <HomePage
      isLoading={isLoading}
      onClickHighlightCard={handleClickHightlightCard}
      highlights={HIGHLIGHTED_RESTAURANTS}
    />
  );
};

export default index;
