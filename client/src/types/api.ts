interface DeliveryManApi {
    id: number;
    personDetails: PersonApi;
}

interface PersonApi {
    id: number;
    name: string;
    location: LocationApi;
}

interface CustomerApi {
    id: number;
    personDetails: PersonApi;
}

interface LocationApi {
    x: number;
    y: number;
}

interface MenuApi {
    id: number;
    name: string;
    items: ItemApi[];
}

interface ItemApi {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface RestaurantApi {
    id: number;
    location: LocationApi;
    name: string;
    phone: string;
}

interface OrderApi {
    id: number;
    date: string;
    status: boolean;
    price: number;
    restaurant: RestaurantApi;
    deliveryMan: DeliveryManOrderApi;
    items: ItemApi[];
}

interface DeliveryManOrderApi {
    id: number;
    personDetails: {
        id: number;
        location: LocationApi;
        name: string
    }
}

export type {
    OrderApi,
    ItemApi,
    RestaurantApi,
    MenuApi,
    LocationApi,
    PersonApi,
    DeliveryManApi,
    CustomerApi
}