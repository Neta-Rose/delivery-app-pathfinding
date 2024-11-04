import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dotenv from 'dotenv';

dotenv.config();

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: "postgres",
  entities: ["./**/entities/typeORM/*.ts"],
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  schema: "delivery", 
});
