import express from "express";
import { BookControllers } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createBookValidationSchema, updateBookValidationSchema } from "./book.validation";

const router = express.Router();


router.get('/', BookControllers.getAllBooks);
router.get('/book-with-author/:id', BookControllers.bookWithAuthor);
router.post('/',
    validateRequest(createBookValidationSchema),
    BookControllers.createBook
);

router.put('/:id',
    validateRequest(updateBookValidationSchema),
    BookControllers.updateBook
);
router.delete('/:id',
    BookControllers.deleteBook
);
router.get('/:id',
    BookControllers.getBook
);

export const BookRoutes = router;
