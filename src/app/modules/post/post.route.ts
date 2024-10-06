import { Router } from 'express';

import { PostControllers } from './post.controller';

const router = Router();

router.post('/create-post', PostControllers.createPost);
router.get('/', PostControllers.getAllPost);
router.get('/:id', PostControllers.getSinglePost);
router.delete('/:id', PostControllers.deleteSinglePost);
router.patch('/:id', PostControllers.updateSinglePost);

export const PostRoutes = router;
