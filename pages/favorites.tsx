import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useSelector } from 'react-redux';

import { FullLoader } from '@components/ui/FullLoader/FullLoader';

import { Loader } from '@components/core/Loader/Loader';

import { useBreadcrumbs } from '@components/hooks/useBreadcrumbs';

import { DEFAULT_TEXT_LOADING } from '@helpers/staticData';
import { InitialAppState, BreadcrumbsType } from '@helpers/types';

const DynamicFavoritesPage = dynamic(
  () => import('@components/pages/FavoritesPage/FavoritesPage'),
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ),
  },
);

const Favorites = () => {
  const router = useRouter();

  const { favorites } = useSelector((state: InitialAppState) => state);
  const favoritesBreadcrumbs = {
    text: 'Favorites',
    route: '/favorites',
    asRoute: '/favorites',
    type: BreadcrumbsType.FAVORITES,
  };
  useBreadcrumbs(favoritesBreadcrumbs, 'favorites');

  return (
    <DynamicFavoritesPage
      total={favorites.length}
      restaurants={favorites}
      clickRestaurant={(route: string, asRoute: string) =>
        router.push(route, asRoute)
      }
    />
  );
};

export default Favorites;
