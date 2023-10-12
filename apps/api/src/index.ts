require('dotenv').config();
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { connectToDB } from './configs';
import { handleCors, handleError, handleJwt } from './middlewares';
import { router } from './routes';
import { HttpError } from 'classes';
import { isProdEnv } from './utils/env.utils';

const { PORT = 3000, NODE_ENV } = process.env;

class ExpressServer {
    app = express();

    async start() {
        this.app.listen(PORT, () => console.info(`Server is running on port ${PORT} | ${NODE_ENV}`));
        isProdEnv && this.initStaticFiles();
        await this.initDatebase();
        this.initMiddlewares();
        this.initRouter();
        this.errorHandler();
    }

    initStaticFiles() {
        this.app.use(express.static(`${__dirname}/../../front/dist`));
    }

    async initDatebase() {
        connectToDB();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(handleCors);
        this.app.use(handleJwt);
    }

    initRouter() {
        this.app.use('/api', router);
        this.app.use('*', () => {
            throw HttpError.NOT_FOUND;
        });
    }

    errorHandler() {
        this.app.use((err: Error | HttpError, _: Request, res: Response) => {
            handleError(err, res);
        });
    }
}

const expressServer = new ExpressServer();

expressServer.start().catch((err) => {
    console.trace('App shutdown due to a problem', err.message);
    process.exit(1);
});
