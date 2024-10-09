import { Repository } from "typeorm";
import { myDataSource } from "../connection/data-source";
import logger from "../logger/logger";
import { Menu } from "../entities/typeORM/Menu.entity";

const menuRepository: Repository<Menu> = myDataSource.getRepository(Menu);

const getMenuByRestaurantId = async (restaurantId: number): Promise<Menu> => {
    const menu = await menuRepository.findOne({
        relations: ['items'],
        where: {
            restaurant: { id: restaurantId }
        },
    });

    if(!menu) {
        logger.error("Menu was not found")
    }

    return menu;
}

export { 
    getMenuByRestaurantId
};
