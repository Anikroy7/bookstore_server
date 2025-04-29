import express, { Application, Request, Response } from "express";
import cors from "cors";
import db from "./app/db/db";
require('dotenv').config()

const app: Application = express();

//middlwares
app.use(express.json());
app.use(
    cors({
        credentials: true,
    }),
)


// welcome route
app.get('/', async (req: Request, res: Response) => {

    await db('authors').insert({
        name: "trst",
        bio: "setstsetse",
        birthdate: new Date("2000-07-06"),
    }).then(() => {
        console.log("data inserted successfully");
    }).catch((error) => {
        console.error("error inserting dta", error);
    })
    res.json({
        "message": "Welcome to books store Server"
    })
})

export default app;
