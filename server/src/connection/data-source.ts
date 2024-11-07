// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { SnakeNamingStrategy } from "typeorm-naming-strategies";
// import dotenv from 'dotenv';

// dotenv.config();

// export const myDataSource: DataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER,
//   password: String(process.env.DB_PASSWORD),
//   database: "postgres",
//   entities: ["./**/entities/typeORM/*.ts"],
//   logging: false,
//   synchronize: false,
//   namingStrategy: new SnakeNamingStrategy(),
//   schema: "delivery", 
// });


// data-source.ts

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const myDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: isProduction
    ? ['dist/src/entities/typeORM/*.js']
    : ['src/entities/typeORM/*.ts'],
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  schema: 'delivery',
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
