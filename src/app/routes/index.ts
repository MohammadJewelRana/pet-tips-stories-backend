import { Router } from 'express';

import { UserRoutes } from '../modules/user/user.route';
 
import { AuthRoutes } from '../modules/AuthUser/AuthUser.route';
import { PostRoutes } from '../modules/post/post.route';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/post', route: PostRoutes },

  
];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
