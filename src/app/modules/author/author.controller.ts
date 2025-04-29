import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthorServices } from "./author.service";
import httpStatus from "http-status";


const createAuthor = catchAsync(async (req, res) => {
    const authorData = req.body;
    const result = await AuthorServices.createAuthor(authorData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Author created successfully",
        data: result,
    });
});


export const AuthorControllers = {
    createAuthor
}