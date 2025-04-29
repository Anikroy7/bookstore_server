import db from "../../db/db";
import IAuthor from "./author.interface";

const createAuthor = async (payload: IAuthor) => {
    const data = await db('authors').insert(payload);
    return data;
}

export const AuthorServices = {
    createAuthor
}