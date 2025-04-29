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

const getBookWithAuthorFromDB = async (id: string) => {
    const book = await db('books').where({ id }).first();
    if (!book) {
        throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
    }
    const result = await db('books')
        .join('authors', 'books.author_id', 'authors.id')
        .where('books.id', id)
        .select([
            'books.id as book_id',
            'books.title',
            'books.description',
            'books.published_date',
            'books.author_id',
            'authors.name as author_name',
            'authors.bio as author_bio',
            'authors.birthdate as author_birthdate',
        ])
        .first();
    return result;
}


export const BooksServices = {
    getAllBooksFromDB,
    createBookIntoDB,
    updateBookByIdIntoDB,
    getSingleBookFromDB,
    deleteBookIntoDB,
    getBookWithAuthorFromDB
}