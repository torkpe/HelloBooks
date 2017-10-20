import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const notifications = controllers.notification;
const router = express.Router();
// Send notification to user for charges
router.post('/api/notifications', authorize.checkAuthentication, notifications.createNotification);
// Get notification for user
router.get('/api/notifications/user', authorize.checkAuthentication, authorize.authorizeUser, notifications.getUserNotifications);
// Get notification for admin
router.get('/api/notifications/admin', authorize.checkAuthentication, authorize.authorizeAdmin, notifications.getAdminNotifications);

export default router;
