import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {config} from './config/config';
import Logging from './library/Logging';

const router = express();

mongoose
    .connect(config.mongo.url, {retryWrites: true, w: 'majority'})
    .then(() => {
        Logging.info('Connected MongoDB');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable connection');
        Logging.error(error);
    });

const StartServer = () => {
    router.use((req, res, next) => {});
};
