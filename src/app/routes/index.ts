import { Router } from 'express';

import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [{ path: '/user', route: UserRoutes }];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
