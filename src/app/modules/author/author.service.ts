import db from "../../db/db";
import AppError from "../../errors/AppError";
import { IPaginationOptions, TFilterableFields } from "../../types/global";
import { paginationHelper } from "../../utils/paginationHelpers";
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

const getAllAuthorsFromDB = async (params: TFilterableFields, options: IPaginationOptions) => {

    const { searchTerm } = params;

    const { page, limit, skip } = paginationHelper.calculatePagination(options);

    const query = db('authors').select('*');

    if (searchTerm) {
        query.whereILike('name', `%${searchTerm}%`);
    }
    query.limit(limit).offset(skip);

    const authors = await query;

    const countQuery = db('authors');
    if (searchTerm) {
        countQuery.whereILike('name', `%${searchTerm}%`);
    }

    const [{ count }] = await countQuery.count('* as count');

    return {
        meta: {
            page,
            limit,
            total: Number(count),
        },
        data: authors,
    };
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

const getAuthorsWithBooksFromDB = async () => {
    const authors = await db('authors')
        .leftJoin('books', 'authors.id', 'books.author_id')
        .groupBy('authors.id')
        .select([
            'authors.id as author_id',
            'authors.name as author_name',
            'authors.bio as author_bio',
            'authors.birthdate as author_birthdate',
            db.raw(
                `COALESCE(
             json_agg(json_build_object(
               'id', books.id,
               'title', books.title,
               'published_date', books.published_date
             )) FILTER (WHERE books.id IS NOT NULL),
             '[]'
           ) as books`
            ),
        ]);
    return authors;
}

const getAuthorWithBooksFromDB = async (id: string) => {
    const author = await db('authors').where({ id }).first();
    if (!author) {
        throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
    }

    const result = await db('authors')
        .leftJoin('books', 'authors.id', 'books.author_id')
        .where('authors.id', id)
        .groupBy('authors.id')
        .select([
            'authors.id as author_id',
            'authors.name as author_name',
            'authors.bio as author_bio',
            'authors.birthdate as author_birthdate',
            db.raw(
                `COALESCE(
             json_agg(json_build_object(
               'id', books.id,
               'title', books.title,
               'published_date', books.published_date
             )) FILTER (WHERE books.id IS NOT NULL),
             '[]'
           ) as books`
            ),
        ])
        .first();
    return result;
}


export const AuthorServices = {
    createAuthorIntoDB,
    getSingleAuthorFromDB,
    getAllAuthorsFromDB,
    updateAuthorByIdIntoDB,
    deleteAuthorByIdIntoDB,
    getAuthorsWithBooksFromDB,
    getAuthorWithBooksFromDB
}