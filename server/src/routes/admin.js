import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const { borrowBook, notification, users } = controllers;
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
  authorize.authorizeAdmin, borrowBook.remindUser
);
router.put(
  '/admin/update-admin-notification/:userId', authorize.checkAuthentication, authorize.authorizeUser,
  notification.updateAdminNotification
);
router.get(
  '/admins/requests', authorize.checkAuthentication, authorize.authorizeAdmin,
  requests.getRequests
);
// upgrade user
router.put(
  '/admins/upgrade-user/:userId', authorize.checkAuthentication, authorize.authorizeAdmin,
  users.upgradeUser
);
export default router;
