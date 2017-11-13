import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const borrowBookControllers = controllers.borrowBook;

const router = express.Router();
// Get all users exceeding deadline
router.get('/admins/exceed-deadlines', authorize.checkAuthentication, authorize.authorizeAdmin,
  borrowBookControllers.exceedDeadline);
// Charge user
router.put('/admins/charge-user/:userId/:bookId', authorize.checkAuthentication,
  authorize.authorizeAdmin, borrowBookControllers.chargeUser);

export default router;
