import Notification from "../models/Notification.js";



export const createNotification = async (req, res) => {
  try {

    const {
      title,
      message,
      type,
      receiver,
      sender,
      referenceId,
      referenceType,
    } = req.body;

    const notification = await Notification.create({
      title,
      message,
      type,
      receiver,
      sender,
      referenceId,
      referenceType,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully.",
      data: notification,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const getNotifications = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";

    const query = {
      receiver: req.user.id,

      title: {
        $regex: search,
        $options: "i",
      },
    };

    const totalCount =
      await Notification.countDocuments(query);

    const notifications =
      await Notification.find(query)
        .populate("sender", "name email")
        .populate("receiver", "name email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return res.status(200).json({
      success: true,
      totalCount,
      data: notifications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const getNotificationById = async (req, res) => {
  try {

    const notification =
      await Notification.findById(req.params.id)
        .populate("sender", "name email")
        .populate("receiver", "name email");

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });

    }

    return res.status(200).json({
      success: true,
      data: notification,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const markAsRead = async (req, res) => {
  try {

    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const markAllAsRead = async (req, res) => {
  try {

    await Notification.updateMany(
      {
        receiver: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const deleteNotification = async (req, res) => {
  try {

    const notification =
      await Notification.findByIdAndDelete(
        req.params.id
      );

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};