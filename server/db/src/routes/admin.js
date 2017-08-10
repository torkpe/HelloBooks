import express from 'express';
import controllers from '../controllers';

const adminControllers = controllers.admin;
const router = express.Router();
//  signin admin
router.post('/api/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/admin/signin', adminControllers.findAdmin);
router.get('/api/admins', adminControllers.findAdmins);
export default router;
