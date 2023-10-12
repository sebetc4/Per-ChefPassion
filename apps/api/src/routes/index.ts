import { Router } from 'express';
import authRouter from './auth.routes';
import usersRouter from './users.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
