import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dotenv from 'dotenv';
import { Restaurant } from "../entities/typeORM";
import { Order } from "../entities/typeORM";
import { Menu } from "../entities/typeORM";
import { DeliveryMan } from "../entities/typeORM";

dotenv.config();

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: "postgres",
  entities: [
    Restaurant,
    Order,
    Menu,
    DeliveryMan
  ],
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  schema: "delivery", 
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
