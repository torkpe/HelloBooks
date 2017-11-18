import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const { borrowBook } = controllers;
const { requests } = controllers;
const router = express.Router();
// Get all users exceeding deadline
router.get(
  '/admins/exceed-deadlines', authorize.checkAuthentication, authorize.authorizeAdmin,
  borrowBook.exceedDeadline
);
// Charge user
router.put(
  '/admins/charge-user/:userId/:bookId', authorize.checkAuthentication,
  authorize.authorizeAdmin, borrowBook.chargeUser
);
router.get(
  '/admins/requests', authorize.checkAuthentication, authorize.authorizeAdmin,
  requests.getRequests
);
export default router;
