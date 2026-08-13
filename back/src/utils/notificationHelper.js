import Notification from "../models/Notification.js";

const createNotification = async ({
  title,
  message,
  type = "System",
  receiver,
  sender = null,
  referenceId = null,
  referenceType = "",
}) => {
  try {
    if (!receiver) {
      console.warn("Notification skipped: receiver not found");
      return null;
    }

    const notification = await Notification.create({
      title,
      message,
      type,
      receiver,
      sender,
      referenceId,
      referenceType,
    });

    console.log("NOTIFICATION CREATED:", notification._id);

    return notification;
  } catch (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);
    return null;
  }
};

export default createNotification;