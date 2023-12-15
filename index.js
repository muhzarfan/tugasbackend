import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Authorization,Content-Type',
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
  

try{
    await db.authenticate();
    console.log("Database Connected...");   
}catch (error) {
    console.error(error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(4000, ()=> console.log('Server running at port 4000'));