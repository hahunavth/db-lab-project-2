import { Pool, PoolClient } from "pg";

let conn: Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: "tahcmmln",
    password: "Rn_maIfO2BkXy4uKRU_5Lji_QwbjSMjf",
    host: "john.db.elephantsql.com",
    port: 5432,
    database: "tahcmmln",
  });
}

export { conn };

// {
//   user: "postgres",
//   password: "",
//   host: "localhost",
//   port: 5432,
//   database: "group_11_10",
// }
