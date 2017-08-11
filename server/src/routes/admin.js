import express from 'express';
import controllers from '../controllers';

const adminControllers = controllers.admin;
const router = express.Router();
//  signin admin
router.post('/api/v1/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/v1/admin/signin', adminControllers.findAdmin);
router.get('/api/v1/admins', adminControllers.findAdmins);
export default router;
