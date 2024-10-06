import { Router } from 'express';
import { AuthControllers } from './AuthUser.controller';

const router = Router();

router.post('/login', AuthControllers.loginUser);

router.post('/refresh-token', AuthControllers.refreshToken);

export const AuthRoutes = router;
