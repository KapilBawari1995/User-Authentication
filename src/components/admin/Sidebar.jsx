import React from "react";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  FolderKanban,
  ShieldCheck,
  CalendarDays,
  BarChart3,
  Bell,
  Settings,
  User,
  Lock,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {


  const { permissions, isSuperAdmin } = useSelector(
    (state) => state.auth
  );
const auth = useSelector((state) => state.auth);

  console.log("AUTH STATE:", auth);
console.log("Permissions:", auth.permissions);
console.log("Role:", auth.role);
console.log("Super Admin:", auth.isSuperAdmin);
  console.log(permissions)
  console.log("SUPER ADMIN:", isSuperAdmin);

  const menu = [
    {
      name: "Dashboard",
      module: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },

    {
      name: "Tasks",
      module: "Tasks",
      icon: <ClipboardList size={20} />,
      path: "/admin/tasks",
    },

    {
      name: "Users",
      module: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },

    {
      name: "Role",
      module: "Roles",
      icon: <Users size={20} />,
      path: "/admin/roles",
    },

    {
      name: "Permission",
      module: "Permission",
      icon: <ShieldCheck size={20} />,
      path: "/admin/permission-management",
    },

    {
      name: "Projects",
      module: "Projects",
      icon: <FolderKanban size={20} />,
      path: "/admin/projects",
    },

    {
      name: "Calendar",
      module: "Calendar",
      icon: <CalendarDays size={20} />,
      path: "/admin/calendar",
    },

    {
      name: "Reports",
      module: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/admin/reports",
    },

    {
      name: "Notifications",
      module: "Notifications",
      icon: <Bell size={20} />,
      path: "/admin/notifications",
    },

    {
      name: "Profile",
      module: "Profile",
      icon: <User size={20} />,
      path: "/admin/profile",
    },

    {
      name: "Settings",
      module: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },

    {
      name: "Change Password",
      module: "Change Password",
      icon: <Lock size={20} />,
      path: "/admin/change-password",
    },
  ];



  // ================= Permission Filter =================

  const filteredMenu = menu.filter((item)=>{


    // Super Admin full access
    if(isSuperAdmin){
      return true;
    }


    const permission = permissions?.find(
      (p)=>p.module === item.module
    );


    return permission?.view === true;

  });



  return (

    <aside style={styles.sidebar}>


      <div style={styles.logo}>
        <h2>Task Portal</h2>
      </div>



      <div style={styles.menu}>


        {
          filteredMenu.map((item)=>(

            <NavLink

              key={item.path}

              to={item.path}


              style={({isActive})=>({

                ...styles.link,

                background:isActive
                ? "#4f46e5"
                : "transparent",

                color:isActive
                ? "#fff"
                : "#334155",

              })}

            >

              {item.icon}

              <span>
                {item.name}
              </span>


            </NavLink>

          ))
        }


      </div>



      <button style={styles.logout}>

        <LogOut size={20}/>

        Logout

      </button>


    </aside>

  );
};



const styles = {


  sidebar:{
    width:"250px",
    height:"calc(100vh - 70px)",
    background:"#fff",
    position:"fixed",
    top:"70px",
    left:0,
    display:"flex",
    flexDirection:"column",
    padding:"20px 15px",
    boxShadow:"2px 0 10px rgba(0,0,0,.08)",
  },


  logo:{
    textAlign:"center",
    marginBottom:"25px",
    color:"#4f46e5",
  },


  menu:{
    display:"flex",
    flexDirection:"column",
    gap:"8px",
    overflowY:"auto",
  },


  link:{
    display:"flex",
    alignItems:"center",
    gap:"12px",
    padding:"12px 15px",
    textDecoration:"none",
    borderRadius:"10px",
    fontWeight:"600",
    transition:".3s",
  },


  logout:{
    marginTop:"auto",
    padding:"12px",
    border:"none",
    borderRadius:"10px",
    background:"#ef4444",
    color:"#fff",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    gap:"10px",
    cursor:"pointer",
    fontWeight:"600",
  },


};


export default Sidebar;