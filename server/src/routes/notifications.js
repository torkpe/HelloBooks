import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const notifications = controllers.notification;
const router = express.Router();

// Get notification for user
router.get(
  '/notifications/user/:id',
  authorize.checkAuthentication,
  authorize.authorizeUser,
  notifications.getUserNotifications
);
// Get notification for admin
router.get(
  '/notifications/admin',
  authorize.checkAuthentication,
  authorize.authorizeAdmin,
  notifications.getAdminNotifications
);

export default router;
