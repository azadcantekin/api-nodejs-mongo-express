import {IUser} from './../models/User';
import {Schema} from 'mongoose';
import {errors} from './../../node_modules/@sideway/address/lib/index.d';
import Joi, {ObjectSchema} from 'joi';
import {NextFunction, Request, Response} from 'express';
import Logging from '../library/Logging';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({error});
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            email: Joi.string().required(),
            password: Joi.string().required()
        }),
        update: {
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};
