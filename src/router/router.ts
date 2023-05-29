import { Router } from 'express';
import Tibia from '../services/Tibia';

const router = Router();
const tibia = new Tibia();

router.use('/', async (req, res) => {
  res.json({
    result: await tibia.players()
  });
});

export default router;