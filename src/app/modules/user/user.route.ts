import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post('/create-user', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:id', UserControllers.getSingleUser);
router.delete('/:id', UserControllers.deleteSingleUser);
router.patch('/:id', UserControllers.updateSingleUser);

export const UserRoutes = router;
