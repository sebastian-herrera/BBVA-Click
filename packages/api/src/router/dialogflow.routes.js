import { Router } from 'express';
import { getLatLog, createExample } from '../controller/dialogflow.controller';

const router = Router();

router.post('/', getLatLog);
router.get('/', createExample);
// router.post('/webhook/', createExample);

export default router;
// export { router };
