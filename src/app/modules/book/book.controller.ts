import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BooksServices } from "./book.service";
import httpStatus from "http-status";

const getAllBooks = catchAsync(async (req, res) => {
    const result = await BooksServices.getAllBooksFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All books retrieved successfully",
        data: result,
    });
});
const createBook = catchAsync(async (req, res) => {
    const bookData = req.body;
    const result = await BooksServices.createBookIntoDB(bookData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book created successfully",
        data: result,
    });
});
const updateBook = catchAsync(async (req, res) => {
    const bookData = req.body;
    const { id } = req.params;
    const result = await BooksServices.updateBookByIdIntoDB(id, bookData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book updated successfully",
        data: result,
    });
});
const getBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BooksServices.getSingleBookFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book retrived successfully",
        data: result,
    });
});
const deleteBook = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BooksServices.deleteBookIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book deleted successfully",
        data: result,
    });
});
const bookWithAuthor = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BooksServices.getBookWithAuthorFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book with author retrived successfully",
        data: result,
    });
});



export const BookControllers = {
    getAllBooks,
    createBook,
    updateBook,
    getBook,
    bookWithAuthor,
    deleteBook
}