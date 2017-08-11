import express from 'express';

const router = express.Router();
//  show index page
router.get('/api/v1', (req, res) => {
  res.send({ message: '<h1>hello landing page<h1>' });
});
export default router;
