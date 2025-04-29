import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
require('dotenv').config()

const app: Application = express();

//middlwares
app.use(express.json());
app.use(
    cors({
        credentials: true,
    }),
)

// application routes
app.use('/api/v1', router)

// welcome route
app.get('/', async (req: Request, res: Response) => {
    res.json({
        "message": "Welcome to books store Server"
    })
})


//Global middleware
app.use(globalErrorHandler);

//not Found
app.use(notFound)

export default app;
