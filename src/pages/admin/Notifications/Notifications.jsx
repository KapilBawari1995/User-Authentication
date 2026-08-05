import React, { useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Bell,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getNotificationsRequest,
} from "../../../features/notification/notificationSlice";


const Notifications = () => {


  const dispatch = useDispatch();


  const {
    notifications,
    loading,
    error,

  } = useSelector(
    (state) => state.notification
  );



  useEffect(()=>{

    dispatch(
      getNotificationsRequest()
    );

  },[dispatch]);



  const getIcon = (type)=>{

    switch(type){

      case "Task":
        return <CheckCircle size={22}/>;

      case "Project":
        return <AlertTriangle size={22}/>;

      case "User":
        return <Info size={22}/>;

      default:
        return <Clock size={22}/>;

    }

  };



  if(loading){

    return (
      <h3>
        Loading Notifications...
      </h3>
    )

  }



  return (

    <div className="notifications-page">


      <div className="notification-header">

        <div>

          <h2>
            Notifications
          </h2>

          <p>
            Stay updated with your latest activities.
          </p>

        </div>


        <button className="mark-btn">

          Mark All as Read

        </button>


      </div>




      <div className="notification-list">


        {
          notifications?.length > 0 ?


          notifications.map((item)=>(
            

            <div
              key={item._id}
              className={
                `notification-card ${
                  !item.isRead ? "unread" : ""
                }`
              }
            >


              <div className="notification-icon">


                {
                  getIcon(item.type)
                }


              </div>



              <div className="notification-content">


                <h4>
                  {item.title}
                </h4>


                <p>
                  {item.message}
                </p>


                <span>

                  {
                    new Date(
                      item.createdAt
                    ).toLocaleString()
                  }

                </span>


              </div>


            </div>


          ))


          :


          <div>

            <Bell size={30}/>

            <p>
              No Notifications Found
            </p>

          </div>


        }


      </div>



    </div>

  );

};


export default Notifications;