import { UseQueryResult, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { ProductType } from '../types/ProductType';

export const UseGetProductsQuery = (): UseQueryResult<ProductType[], unknown> =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      (await apiClient.get<ProductType[]>(`api/products`)).data,
  });
