import { Router } from 'express';
const router = Router();

router.use('/', (req, res) => {
  res.json({
    code: res.statusCode,
    message: "Hello, World"
  })
});

export default router;