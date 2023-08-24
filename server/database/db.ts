import "reflect-metadata";
import { DataSource } from "typeorm";
import Usuario from "../Usuarios/Usuario";

export const db = new DataSource ({

    type: "postgres",
    host: "db", //substituir para localhost
    port: 5432,
    username: "postgres",
    password: "Root123@md",
    database: "cadastro",
    synchronize: false,
    logging: false,
    entities: [Usuario],
    migrations: [],
})

db.initialize()
    .then(() => {
        console.log('Servidor Iniciado');
    })
    .catch((error) => console.log(error))