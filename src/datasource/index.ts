import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "src/sql/countries.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: false
});

export default dataSource;