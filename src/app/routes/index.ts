import { Router } from 'express';

import { UserRoutes } from '../modules/user/user.route';
 
import { AuthRoutes } from '../modules/AuthUser/AuthUser.route';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },

  
];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
