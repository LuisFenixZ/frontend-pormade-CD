import "reflect-metadata";
import express, { response } from 'express';
import { request } from 'http';
import cors from 'cors';
import usuariosController from './Usuarios/UsuariosController';

const listenPort = 3001;

const app = express();
app.use(express.json());

app.get('/', (request, response) =>{
    response.send("Servidor Funcionando")
})

app.use(cors({
    // origin: "http://localhost:3000",
    origin: "http://192.168.92.170:3000",
    // origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }));
  

// app.use(cors());

app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Substitua pelo domínio do seu frontend
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  
app.use('/users', usuariosController);

app.listen(listenPort, () =>{
    console.log("Address: http://localhost: " + listenPort);
})

