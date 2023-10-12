import { Router } from 'express';
import { getCurrentUser, signin, signout } from '../controllers';

const router = Router();

router.get('/', getCurrentUser)
router.post('/', signin);
router.delete('/', signout)

export default router;
