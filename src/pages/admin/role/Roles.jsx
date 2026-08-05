import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getRolesRequest,
} from "../../../features/role/roleSlice";


const Roles = () => {


  const dispatch = useDispatch();

  const navigate = useNavigate();



  const {
    roles,
    loading,
    error

  } = useSelector(
    (state)=>state.role
  );



  useEffect(()=>{

    dispatch(
      getRolesRequest()
    );

  },[dispatch]);


console.log(roles)



  return (

    <div className="p-6">


      {/* Header */}

      <div className="flex justify-between items-center mb-6">


        <h1 className="text-2xl font-bold">
          Roles
        </h1>



        <button

          onClick={()=>navigate("/admin/roles/addrole")}

          className="bg-blue-600 text-white px-5 py-2 rounded"

        >

          + Add Role

        </button>


      </div>





      {
        loading && (

          <p>
            Loading roles...
          </p>

        )
      }





      {
        error && (

          <p className="text-red-500">
            {error}
          </p>

        )
      }






      {/* Role Table */}


      <div className="bg-white shadow rounded">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>


              <th className="p-3 text-left">
                #
              </th>


              <th className="p-3 text-left">
                Role Name
              </th>


              <th className="p-3 text-left">
                Description
              </th>


              <th className="p-3 text-left">
                Type
              </th>


            </tr>


          </thead>





          <tbody>


          {
            roles?.length > 0 ?


            roles.map((role,index)=>(


              <tr 
                key={role._id}
                className="border-b"
              >


                <td className="p-3">
                  {index+1}
                </td>



                <td className="p-3 font-semibold">
                  {role.name}
                </td>



                <td className="p-3">
                  {role.description || "-"}
                </td>



                <td className="p-3">

                  {
                    role.isSystem 
                    ? 
                    "System Role"
                    :
                    "Custom Role"
                  }

                </td>



              </tr>


            ))

            :

            (

              <tr>

                <td 
                colSpan="4"
                className="text-center p-5"
                >

                  No Roles Found

                </td>


              </tr>

            )


          }


          </tbody>



        </table>



      </div>



    </div>

  );

};


export default Roles;