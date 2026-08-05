import React, { useEffect } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getProfileRequest,
} from "../../features/profile/profileSlice";


const Profile = () => {


  const dispatch = useDispatch();


  const {
    profile,
    loading,
    error

  } = useSelector(
    (state)=>state.profile
  );



  useEffect(()=>{

    dispatch(
      getProfileRequest()
    );

  },[dispatch]);

console.log(profile)

  if(loading){

    return <h3>Loading Profile...</h3>;

  }



  if(error){

    return <h3>{error}</h3>;

  }



  return (

    <div className="profile-page">


      {/* Header */}

      <div className="profile-header">

        <h2>
          My Profile
        </h2>


        <button className="edit-btn">

          <Edit size={18}/>

          Edit Profile

        </button>


      </div>




      {/* Profile Card */}


      <div className="profile-card">


        <div className="profile-left">


          <img

            src={
              profile?.profileImage ||
              "https://i.pravatar.cc/180"
            }

            alt="Profile"

            className="profile-image"

          />



          <h3>

            {profile?.name}

          </h3>



          <p>

            {profile?.role?.name ||
             "User"}

          </p>



          <span className="status">

            ● Online

          </span>


        </div>





        <div className="profile-right">


          <div className="info-box">



            <div className="info-item">

              <Mail size={18}/>

              <span>

                {profile?.email}

              </span>

            </div>




            <div className="info-item">

              <Phone size={18}/>

              <span>

                {profile?.phone ||
                 "Not Available"}

              </span>

            </div>





            <div className="info-item">

              <MapPin size={18}/>

              <span>

                {profile?.address ||
                 "India"}

              </span>

            </div>





            <div className="info-item">

              <Briefcase size={18}/>

              <span>

                {profile?.role?.name ||
                 "Employee"}

              </span>

            </div>





            <div className="info-item">

              <Calendar size={18}/>

              <span>

                Joined :
                {
                  profile?.createdAt
                  ?
                  new Date(
                    profile.createdAt
                  ).toDateString()
                  :
                  "-"
                }

              </span>

            </div>



          </div>


        </div>


      </div>





      {/* Skills */}


      <div className="skill-card">


        <h3>
          Skills
        </h3>


        <div className="skills">


          <span>React JS</span>

          <span>Redux Toolkit</span>

          <span>JavaScript</span>

          <span>HTML5</span>

          <span>CSS3</span>

          <span>Node JS</span>

          <span>Express JS</span>

          <span>MongoDB</span>


        </div>


      </div>






      {/* Recent Activity */}


      <div className="activity-card">


        <h3>
          Recent Activity
        </h3>


        <ul>

          <li>
            ✅ Completed Login Module
          </li>


          <li>
            📋 Created New Tasks
          </li>


          <li>
            👥 Added Team Members
          </li>


          <li>
            📁 Updated Projects
          </li>


        </ul>


      </div>




    </div>

  );

};


export default Profile;