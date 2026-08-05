import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTasksRequest
} from "../../../features/task/taskSlice";

import {
  ClipboardList,
  Clock,
  CheckCircle,
  Activity,
  Calendar,
  AlertCircle
} from "lucide-react";


const Tasks = () => {


  const dispatch = useDispatch();


  const {
    tasks,
    loading,
    totalCount
  } = useSelector(
    (state)=>state.task
  );



  useEffect(()=>{

    dispatch(
      getTasksRequest({
        page:1,
        pageSize:10
      })
    );

  },[dispatch]);




  return (

    <div className="tasks-page">


      {/* Header */}

      <div className="tasks-header">

        <div>

          <h2>
            Task Management
          </h2>

          <p>
            Manage and monitor all project tasks.
          </p>

        </div>


        <button className="add-task-btn">

          + Create Taskf

        </button>


      </div>





      {/* Stats */}


      <div className="stats-grid">


        <div className="stat-card">

          <ClipboardList/>

          <h3>
            {totalCount}
          </h3>

          <span>
            Total Tasks
          </span>

        </div>



        <div className="stat-card">

          <Clock/>

          <h3>
            {
              tasks.filter(
                t=>t.status==="Pending"
              ).length
            }
          </h3>

          <span>
            Pending
          </span>

        </div>




        <div className="stat-card">

          <Activity/>

          <h3>
            {
              tasks.filter(
                t=>t.status==="In Progress"
              ).length
            }
          </h3>

          <span>
            In Progress
          </span>

        </div>





        <div className="stat-card">

          <CheckCircle/>

          <h3>
            {
              tasks.filter(
                t=>t.status==="Completed"
              ).length
            }
          </h3>

          <span>
            Completed
          </span>

        </div>


      </div>






      {/* Task List */}


      <div className="card">


        <div className="card-title">

          <ClipboardList size={20}/>

          <h3>
            All Tasks
          </h3>


        </div>



        {
          loading ?

          <h3>
            Loading...
          </h3>


          :


          tasks.length === 0 ?

          <h3>
            No Task Found
          </h3>


          :


          tasks.map((task)=>(


            <div
              className="task-item"
              key={task._id}
            >


              <div>


                <h4>
                  {task.title}
                </h4>


                <p>

                  Assigned To :

                  {" "}

                  {
                    task.assignedTo?.name ||
                    "Not Assigned"
                  }

                </p>


                <small>

                  Due Date :

                  {" "}

                  {
                    new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  }

                </small>


              </div>





              <span>


                {task.status}


              </span>



            </div>


          ))


        }


      </div>






      {/* Upcoming Deadline */}


      <div className="card">


        <div className="card-title">

          <Calendar size={20}/>

          <h3>
            Upcoming Deadlines
          </h3>

        </div>



        {
          tasks
          .slice(0,3)
          .map(task=>(

            <div
              className="deadline"
              key={task._id}
            >

              <AlertCircle/>


              <div>

                <h4>
                  {task.title}
                </h4>


                <p>

                  {
                    new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  }

                </p>

              </div>


            </div>


          ))
        }



      </div>



    </div>

  );
};



export default Tasks;