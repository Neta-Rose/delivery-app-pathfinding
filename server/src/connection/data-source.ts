import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: "postgres",
  entities: [path.join(__dirname, 'entities', '**/*.entity.{ts,js}')],
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  schema: "delivery", 
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
