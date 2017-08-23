import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const borrowBookControllers = controllers.borrowBook;

const adminControllers = controllers.admin;
const router = express.Router();
router.post('/api/v1/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/v1/admin/signin', adminControllers.findAdmin);
router.get('/api/v1/admins', adminControllers.findAdmins);
router.get('/api/v1/admins/exceed-deadlines', authorize.checkAuthentication, authorize.authorizeAdmin,
  borrowBookControllers.exceedDeadline);

export default router;
