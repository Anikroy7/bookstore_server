import express from "express";
import { AuthorControllers } from "./author.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAuthorValidationSchema, updateAuthorValidationSchema } from "./author.validation";

const router = express.Router();


router.get('/',AuthorControllers.getAllAuthors);
router.get('/authors-with-books',AuthorControllers.authorsWithBooks);
router.get('/author-with-books/:id',AuthorControllers.authorWithBooks);

router.post('/',
    validateRequest(createAuthorValidationSchema),
    AuthorControllers.createAuthor
)

router.put('/:id',
    validateRequest(updateAuthorValidationSchema),
    AuthorControllers.updateAuthor
)
router.delete('/:id',
    AuthorControllers.deleteAuthor
)

router.get('/:id',AuthorControllers.getSingleAuthor);

export const AuthorRoutes = router;
