import { Router } from "express";
import { AuthorRoutes } from "../modules/author/author.route";
import { BookRoutes } from "../modules/book/book.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/authors",
    route: AuthorRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
  