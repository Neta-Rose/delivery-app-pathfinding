import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["./**/entities/typeORM/*.ts"],
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  schema: "delivery", 
});
