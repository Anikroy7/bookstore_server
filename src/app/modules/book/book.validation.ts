import { z } from "zod";

export const createBookValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        description: z.string({
            required_error: "Description is required",
        }).optional(),
        published_date: z.coerce.date({
            required_error: "Published date is required",
            invalid_type_error: "Published date must be a valid date",
        }),
        author_id: z.number({
            required_error: "Author ID is required",
        }).int().positive({
            message: "Author ID must be a positive integer",
        }),
    }),
});
export const updateBookValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }).optional(),
        description: z.string({
            required_error: "Description is required",
        }).optional(),
        published_date: z.coerce.date({
            required_error: "Published date is required",
            invalid_type_error: "Published date must be a valid date",
        }).optional(),

    }),
});
