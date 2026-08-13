import User from "../models/User.js";

// =====================================================
// GET SETTINGS
// =====================================================

export const getSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("settings");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      settings: {
        notifications:
          user.settings?.notifications ?? true,

        theme:
          user.settings?.theme ?? "light",

        language:
          user.settings?.language ?? "English",
      },
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE SETTINGS
// =====================================================

export const updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      notifications,
      theme,
      language,
    } = req.body;

    const updateData = {};

    // =====================================================
    // NOTIFICATIONS
    // =====================================================

    if (typeof notifications === "boolean") {
      updateData["settings.notifications"] =
        notifications;
    }

    // =====================================================
    // THEME
    // =====================================================

    if (theme !== undefined) {
      if (!["light", "dark"].includes(theme)) {
        return res.status(400).json({
          success: false,
          message:
            "Theme must be either light or dark.",
        });
      }

      updateData["settings.theme"] = theme;
    }

    // =====================================================
    // LANGUAGE
    // =====================================================

    if (language !== undefined) {
      if (!["English", "Hindi"].includes(language)) {
        return res.status(400).json({
          success: false,
          message:
            "Language must be English or Hindi.",
        });
      }

      updateData["settings.language"] =
        language;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("settings");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings: user.settings,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};