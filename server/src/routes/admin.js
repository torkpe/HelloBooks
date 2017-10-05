import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const borrowBookControllers = controllers.borrowBook;

const adminControllers = controllers.admin;
const router = express.Router();
router.post('/api/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/admin/signin', adminControllers.findAdmin);
router.get('/api/admins', adminControllers.findAdmins);
// Get all users exceeding deadline
router.get('/api/admins/exceed-deadlines', authorize.checkAuthentication, authorize.authorizeAdmin,
  borrowBookControllers.exceedDeadline);
//Charge user
router.put('/api/admins/charge-user/:userId/:bookId', authorize.checkAuthentication,
  authorize.authorizeAdmin, borrowBookControllers.chargeUser);

export default router;
