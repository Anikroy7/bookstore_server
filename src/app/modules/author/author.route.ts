import express from "express";
import { AuthorControllers } from "./author.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAuthorValidationSchema } from "./author.validation";

const router = express.Router();



router.post('/',
    validateRequest(createAuthorValidationSchema),
    AuthorControllers.createAuthor
)

router.get('/:id',AuthorControllers.getSingleAuthor);

export const AuthorRoutes = router;
