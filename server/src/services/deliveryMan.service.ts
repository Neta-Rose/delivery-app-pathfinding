import { Repository } from "typeorm";
import { myDataSource } from "../connection/data-source";
import logger from "../logger/logger";
import { DeliveryMan } from "../entities/typeORM/DeliveryMan.entity";

const deliveryManRepository: Repository<DeliveryMan> = myDataSource.getRepository(DeliveryMan);

const getAllDeliveryMans = async (): Promise<DeliveryMan[]> => {
    const delivertMans = await deliveryManRepository.find({
        relations: ['personDetails']
    });

    if(!delivertMans) {
        logger.error("No restaurants were found")
    }

    return delivertMans;
}

const getDeliveryManById = async (id: number): Promise<DeliveryMan> => {
    const deliveryMan = await deliveryManRepository.findOne({
        where : { id }
    });

    if(!deliveryMan) {
        logger.error(`No restaurant with id ${id} was found`)
    }

    return deliveryMan;
}

export { 
    getAllDeliveryMans,
    getDeliveryManById
};
