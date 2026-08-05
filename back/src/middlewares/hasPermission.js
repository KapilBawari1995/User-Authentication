import User from "../models/User.js";


const hasPermission = (permission) => {

  return async (req, res, next) => {

    try {

      const user = await User.findById(req.user.id)
        .populate({
          path: "role",
        });


      if (!user) {
        return res.status(404).json({
          success:false,
          message:"User not found"
        });
      }


      // Super Admin full access
      if (user.isSuperAdmin) {
        return next();
      }


      const permissions = user.role.permissions;


      if (!permissions.includes(permission)) {
        return res.status(403).json({
          success:false,
          message:"Permission denied"
        });
      }


      next();


    } catch(error){

      res.status(500).json({
        success:false,
        message:error.message
      });

    }

  };

};


export default hasPermission;