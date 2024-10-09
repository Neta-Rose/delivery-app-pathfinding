import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { GridInterface } from "../types/grid";
import { pathResponse } from "../types/response";
import { CustomerApi, DeliveryManApi, MenuApi, OrderApi, RestaurantApi } from "../types/api";
import { itemDetailsInterface } from "../types/order";

const getData = async <T>(
  request: Promise<AxiosResponse<T, unknown>>
): Promise<T> => {
  const result = await request;

  return result.data;
};

export default {
  menus() {
    return {
      getMenuByRestaurantId: (restaurantId: number): Promise<MenuApi> =>
        getData<MenuApi>(axiosInstance.get(`menus/${restaurantId}`)),
    };
  },
  deliveryMans() {
    return {
      getAll: (): Promise<DeliveryManApi[]> =>
        getData<DeliveryManApi[]>(axiosInstance.get("delivery-mans")),
    };
  },
  restaurants() {
    return {
      getAll: (): Promise<RestaurantApi[]> =>
        getData<RestaurantApi[]>(axiosInstance.get("restaurants")),
    };
  },
  order() {
    return {
      getAll: (): Promise<OrderApi[]> =>
        getData<OrderApi[]>(axiosInstance.get("order/history")),
      placeOrder: (
        grid: GridInterface, 
        startRestaurant: RestaurantApi, 
        algorithm: string, 
        orderItems: itemDetailsInterface[]
      ): Promise<pathResponse> => 
        getData<pathResponse>(axiosInstance.post(`order/${algorithm}`, 
        JSON.stringify({
          grid,
          startRestaurant,
          orderItems
        }), 
        {
          headers: {
            "content-type": "application/json",
          },
        })),
    };
  },
  customers() {
    return {
      getCustomerById: (customerId: number): Promise<CustomerApi> =>
        getData<CustomerApi>(axiosInstance.get(`customers/${customerId}`)),
    };
  }
};
