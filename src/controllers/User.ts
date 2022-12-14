import {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const createUser = (req: Request, res: Response, nex: NextFunction) => {
    const {email, password} = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password
    });
    return user
        .save()
        .then((user) => res.status(201).json({user}))
        .catch((error) => res.status(500).json({error}));
};
const geteUser = (req: Request, res: Response, nex: NextFunction) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({user}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};
const getAlleUser = (req: Request, res: Response, nex: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({users}))
        .catch((error) => res.status(500).json({error}));
};
const updateUser = (req: Request, res: Response, nex: NextFunction) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);
                return user
                    .save()
                    .then((user) => res.status(201).json({user}))
                    .catch((error) => res.status(500).json({error}));
            } else {
                res.status(404).json({message: 'Not found'});
            }
        })
        .catch((error) => res.status(500).json({error}));
};
const deleteUser = (req: Request, res: Response, nex: NextFunction) => {
    const userId = req.params.userId;
    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(200).json({message: 'Deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

export default {createUser, geteUser, getAlleUser, updateUser, deleteUser};
