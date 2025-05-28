import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const dataBase = pgPromise();
const db = dataBase({
  host: "localhost",
  port: 5432,
  database: "cronache",
  user: "postgres",
  password: "postgres",
});

db.none(
  `CREATE TABLE IF NOT EXISTS utenti (
  id SERIAL PRIMARY KEY, 
  nome TEXT NOT NULL, 
  cognome TEXT NOT NULL, 
  email TEXT NOT NULL UNIQUE, 
   password TEXT NOT NULL 
  )`
)
  .then(() => console.log("Tabella creata correttamente"))
  .catch((error) =>
    console.error("Errore durante la creazione della tabella", error)
  );

export default db;
