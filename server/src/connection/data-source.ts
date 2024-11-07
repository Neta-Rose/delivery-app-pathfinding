import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction
  ? path.join(__dirname, '..', 'entities', 'typeORM', '*.js')
  : path.join(__dirname, '..', 'entities', 'typeORM', '*.ts');

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: "postgres",
  entities: [entitiesPath],
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  schema: "delivery", 
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
