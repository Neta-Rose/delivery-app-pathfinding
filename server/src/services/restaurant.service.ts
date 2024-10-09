import { Repository } from "typeorm";
import { myDataSource } from "../connection/data-source";
import logger from "../logger/logger";
import { Restaurant } from "../entities/typeORM/Restaurant.entity";

const restaurantRepository: Repository<Restaurant> = myDataSource.getRepository(Restaurant);

const getAllRestaurant = async (): Promise<Restaurant[]> => {
    const restaurants = await restaurantRepository.find({});

    if(!restaurants) {
        logger.error("No restaurants were found")
    } else {
        logger.info(`Got ${restaurants.length} restaurants`)
    }

    return restaurants;
}

const getRestaurantById = async (id: number): Promise<Restaurant> => {
    const restaurant = await restaurantRepository.findOne({
        where : { id }
    });

    if(!restaurant) {
        logger.error(`No restaurant with id ${id} was found`)
    }

    return restaurant;
}

export { 
    getAllRestaurant,
    getRestaurantById
};
