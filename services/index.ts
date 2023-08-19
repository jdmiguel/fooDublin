import axios, { AxiosError } from 'axios';
import { BASE_API, DUBLIN_COORDINATES } from '@/store/statics';
import {
  RestaurantsRequestParams,
  FetchedRestaurant,
  FetchedRestaurantDetails,
  Suggestion,
} from '@/components/pages/types';

const delayRequest = (ms = 3000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const client = axios.create({
  baseURL: BASE_API,
});

client.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === 'production') {
    await delayRequest();
  }
  return response;
});

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    const { data, status } = error.response;
    return {
      ...data,
      status,
    };
  }

  if (error.request) {
    return {
      status: 500,
    };
  }
};

export const getSuggestionsBySearchText = async (
  searchText: string,
): Promise<{
  suggestions: Suggestion[];
  status: number;
}> => {
  try {
    const { data, status } = await axios.get(
      `/api/autocomplete?searchText=${searchText}&latitude=${DUBLIN_COORDINATES.latitude}&longitude=${DUBLIN_COORDINATES.longitude}`,
    );

    return {
      suggestions: data,
      status,
    };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurants = async ({
  latitude,
  longitude,
  cuisine = '',
  offset = 0,
}: RestaurantsRequestParams): Promise<{
  restaurants: FetchedRestaurant[];
  total: number;
}> => {
  const updatedLatitude = latitude || DUBLIN_COORDINATES.latitude;
  const updatedLongitude = longitude || DUBLIN_COORDINATES.longitude;

  try {
    const { data } = await client(`businesses/search`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        latitude: updatedLatitude,
        longitude: updatedLongitude,
        radius: 1000,
        categories: cuisine,
        offset,
        limit: 20,
      },
    });

    return {
      restaurants: data.businesses,
      total: data.total,
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantDetails = async (
  id: string,
): Promise<{ details: FetchedRestaurantDetails }> => {
  try {
    const { data: detailsData }: any = await axios(`${BASE_API}businesses/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    const { data: reviewsData }: any = await axios(
      `${BASE_API}businesses/${detailsData.id}/reviews`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-requested-with': 'xmlhttprequest',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      },
    );

    return {
      details: { ...detailsData, ...reviewsData },
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};
