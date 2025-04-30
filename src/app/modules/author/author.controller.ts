import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { authorFilterableFields } from "./author.constant";
import { AuthorServices } from "./author.service";
import httpStatus from "http-status";


const createAuthor = catchAsync(async (req, res) => {
    const authorData = req.body;
    const result = await AuthorServices.createAuthorIntoDB(authorData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author created successfully",
        data: result,
    });
});

const getSingleAuthor = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AuthorServices.getSingleAuthorFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author retrieved successfully",
        data: result,
    });
});
const getAllAuthors = catchAsync(async (req, res) => {
    const filters = pick(req.query, authorFilterableFields);

    const options = pick(req.query, ['limit', 'page'])

    const result = await AuthorServices.getAllAuthorsFromDB(filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All authors retrieved successfully",
        data: result,
    });
});

const updateAuthor = catchAsync(async (req, res) => {
    const {id}= req.params;
    const authorData = req.body;
    const result = await AuthorServices.updateAuthorByIdIntoDB(id, authorData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author updated successfully",
        data: result,
    });
});
const deleteAuthor = catchAsync(async (req, res) => {
    const {id}= req.params;
    const result = await AuthorServices.deleteAuthorByIdIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author deleted successfully",
        data: result,
    });
});

const authorsWithBooks = catchAsync(async (req, res) => {
    const result = await AuthorServices.getAuthorsWithBooksFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All authors with books retrieved successfully",
        data: result,
    });
});
const authorWithBooks = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AuthorServices.getAuthorWithBooksFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author with book retrieved successfully",
        data: result,
    });
});


export const AuthorControllers = {
    createAuthor,
    getSingleAuthor,
    updateAuthor,
    getAllAuthors,
    deleteAuthor,
    authorsWithBooks,
    authorWithBooks
}