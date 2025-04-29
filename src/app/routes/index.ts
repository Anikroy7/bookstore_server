import { Router } from "express";
import { AuthorRoutes } from "../modules/author/author.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/authors",
    route: AuthorRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
  