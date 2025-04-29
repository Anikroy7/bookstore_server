import { z } from "zod";

export const createAuthorValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        bio: z.string({
            required_error: "Bio is required",
        }),
        birthdate: z.coerce.date({
            required_error: "Birthdate is required",
            invalid_type_error: "Birthdate must be a valid date",
        }),
    }),
});
