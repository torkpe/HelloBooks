import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const borrowBookControllers = controllers.borrowBook;

const adminControllers = controllers.admin;
const router = express.Router();
router.post('/admin/signup', adminControllers.create);
//  signin admin
router.post('/admin/signin', adminControllers.findAdmin);
router.get('/admins', adminControllers.findAdmins);
// Get all users exceeding deadline
router.get('/admins/exceed-deadlines', authorize.checkAuthentication, authorize.authorizeAdmin,
  borrowBookControllers.exceedDeadline);
// Charge user
router.put('/admins/charge-user/:userId/:bookId', authorize.checkAuthentication,
  authorize.authorizeAdmin, borrowBookControllers.chargeUser);

export default router;
