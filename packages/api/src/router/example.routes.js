import { Router } from 'express';
import { getExample, createExample } from '../controller/example.ctrl';

const router = Router();

router.get('/', getExample);
router.post('/', createExample);

export default router;
// export { router };
