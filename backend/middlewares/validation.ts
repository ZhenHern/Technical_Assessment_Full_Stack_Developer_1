import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validate = (schema: ZodSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({ errors: err.errors });
            }
            else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    };
};

export default validate;