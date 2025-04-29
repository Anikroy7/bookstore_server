import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
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
    const {id} = req.params;
    const result = await AuthorServices.getSingleAuthorFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author retrieved successfully",
        data: result,
    });
});


export const AuthorControllers = {
    createAuthor,
    getSingleAuthor
}