const notificationService = require('../services/notificationService');

async function getNotifications(req, res, next) {
  try {
    const studentId = req.params.studentId || 'std_9841';
    const notifs = await notificationService.getNotificationsByStudentId(studentId);

    res.status(200).json({
      success: true,
      count: notifs.length,
      data: notifs
    });
  } catch (error) {
    next(error);
  }
}

async function markAsRead(req, res, next) {
  try {
    const { id } = req.params;
    const notif = await notificationService.markNotificationAsRead(id);

    if (!notif) {
      return res.status(404).json({
        success: false,
        error: `Notification ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: notif
    });
  } catch (error) {
    next(error);
  }
}

async function markAllAsRead(req, res, next) {
  try {
    const { studentId } = req.body;
    const notifs = await notificationService.markAllNotificationsAsRead(studentId);

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
      data: notifs
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead
};
