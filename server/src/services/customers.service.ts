import { Repository } from "typeorm";
import { myDataSource } from "../connection/data-source";
import logger from "../logger/logger";
import { Customer } from "../entities/typeORM/Customer.entity";

const customerRepository: Repository<Customer> = myDataSource.getRepository(Customer);

const getAllCustomers = async (): Promise<Customer[]> => {
    const customers = await customerRepository.find({
        relations: ['personDetails']
    });

    if(!customers) {
        logger.error("No restaurants were found")
    }

    return customers;
}

const getCustomerById = async (id: number): Promise<Customer> => {
    const customer = await customerRepository.findOne({
        where : { id },
        relations: {
            personDetails: true
        }
    });

    if(!customer) {
        logger.error(`No restaurant with id ${id} was found`)
    }

    return customer;
}

export { 
    getAllCustomers,
    getCustomerById
};
