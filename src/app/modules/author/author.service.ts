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

const getAllAuthorsFromDB = async () => {
    const authors = await db('authors').select('*');
    return authors;
}
const updateAuthorByIdIntoDB = async (id: string, payload: IAuthor) => {
    const author = await db('authors').where({ id }).first();
    if (!author) {
        throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
    }

    const result = await db('authors').where({ id }).update(payload).returning('*');
    return result;
}

const deleteAuthorByIdIntoDB = async (id: string) => {
    const author = await db('authors').where({ id }).first();
    if (!author) {
        throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
    }
    const deleted = await db('authors').where({ id }).del();

    return deleted;
}
export const AuthorServices = {
    createAuthorIntoDB,
    getSingleAuthorFromDB,
    getAllAuthorsFromDB,
    updateAuthorByIdIntoDB,
    deleteAuthorByIdIntoDB
}