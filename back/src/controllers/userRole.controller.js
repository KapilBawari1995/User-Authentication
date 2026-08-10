import User from "../models/User.js";


export const assignRoleToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;


    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    user.role = roleId;

    await user.save();


    res.status(200).json({
      success: true,
      message: "Role assigned to user successfully",
      data: user,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};