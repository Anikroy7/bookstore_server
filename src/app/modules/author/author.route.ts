import express from "express";
import { AuthorControllers } from "./author.controller";

const router = express.Router();


router.post('/',
    AuthorControllers.createAuthor
)


export const AuthorRoutes = router;
