import db from "../../db/db";
import AppError from "../../errors/AppError";
import IBook from "./book.interface";
import httpStatus from "http-status";


const getAllBooksFromDB = async () => {
    const books = await db('books')
        .select('*');
    return books
}

const createBookIntoDB = async (payload: IBook) => {
    const data = await db('books').insert(payload).returning('*');
    return data;
}

const updateBookByIdIntoDB = async (id: string, payload: IBook) => {
    const book = await db('books').where({ id }).first();
    if (!book) {
        throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    }
    const result = await db('books').where({ id }).update(payload).returning('*');
    return result;
}


const getSingleBookFromDB = async (id: string) => {
    const book = await db('books').where({ id }).first();
    if (!book) {
        throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    }
    return book;
}
const deleteBookIntoDB = async (id: string) => {
    const book = await db('books').where({ id }).first();
    if (!book) {
        throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    }
    const deleted = await db('books').where({ id }).del();

    return deleted;
}



export const BooksServices = {
    getAllBooksFromDB,
    createBookIntoDB,
    updateBookByIdIntoDB,
    getSingleBookFromDB,
    deleteBookIntoDB
}