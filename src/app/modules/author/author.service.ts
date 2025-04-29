import db from "../../db/db";
import AppError from "../../errors/AppError";
import IAuthor from "./author.interface";
import httpStatus from "http-status";

const createAuthorIntoDB = async (payload: IAuthor) => {
    const data = await db('authors').insert(payload).returning('*');
    return data;
}

const getSingleAuthorFromDB = async (id: string) => {
    const author = await db('authors').where({ id }).first();
    if (!author) {
        throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
    }
    return author;
}

export const AuthorServices = {
    createAuthorIntoDB,
    getSingleAuthorFromDB
}