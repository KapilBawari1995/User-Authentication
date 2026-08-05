import React from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const Users = () => {

  const users = [
    {
      id:1,
      name:"Kapil Bawari",
      email:"kapil@gmail.com",
      role:"Admin",
      status:"Active"
    },
    {
      id:2,
      name:"Rahul Sharma",
      email:"rahul@gmail.com",
      role:"User",
      status:"Active"
    },
    {
      id:3,
      name:"Amit Kumar",
      email:"amit@gmail.com",
      role:"User",
      status:"Blocked"
    }
  ];


  return (

    <div>

      <div style={styles.header}>
        <div>
          <h1>Users Management</h1>
          <p>Manage all registered users</p>
        </div>


        <button style={styles.addBtn}>
          <Plus size={18}/>
          Add User
        </button>

      </div>



      {/* Cards */}

      <div style={styles.cards}>

        <div style={styles.card}>
          <h3>Total Users</h3>
          <b>120</b>
        </div>


        <div style={styles.card}>
          <h3>Active Users</h3>
          <b>110</b>
        </div>


        <div style={styles.card}>
          <h3>Blocked Users</h3>
          <b>10</b>
        </div>


      </div>



      {/* Search */}

      <div style={styles.searchBox}>

        <Search size={20}/>

        <input 
        placeholder="Search user..."
        style={styles.input}
        />

      </div>




      {/* Table */}

      <div style={styles.tableBox}>

      <table style={styles.table}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

        {
          users.map((user)=>(

          <tr key={user.id}>

            <td>
              👤 {user.name}
            </td>

            <td>
              {user.email}
            </td>


            <td>
              {user.role}
            </td>


            <td>
              <span 
              style={{
                ...styles.status,
                background:user.status==="Active"
                ? "#dcfce7"
                :"#fee2e2"
              }}
              >
                {user.status}
              </span>
            </td>


            <td>

              <button style={styles.edit}>
                <Edit size={17}/>
              </button>


              <button style={styles.delete}>
                <Trash2 size={17}/>
              </button>

            </td>


          </tr>

          ))
        }

        </tbody>


      </table>

      </div>


    </div>

  )
}



const styles={

header:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px"
},


addBtn:{
display:"flex",
alignItems:"center",
gap:"8px",
padding:"12px 18px",
background:"#4f46e5",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer"
},


cards:{
display:"flex",
gap:"20px",
marginBottom:"25px"
},


card:{
background:"#fff",
padding:"20px",
borderRadius:"12px",
width:"200px",
boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
},


searchBox:{
background:"#fff",
padding:"12px",
display:"flex",
alignItems:"center",
gap:"10px",
borderRadius:"10px",
marginBottom:"20px"
},


input:{
border:"none",
outline:"none",
fontSize:"15px",
width:"100%"
},


tableBox:{
background:"#fff",
borderRadius:"12px",
padding:"20px"
},


table:{
width:"100%",
borderCollapse:"collapse"
},


status:{
padding:"5px 12px",
borderRadius:"20px",
fontSize:"13px"
},


edit:{
border:"none",
background:"#e0e7ff",
padding:"8px",
borderRadius:"6px",
cursor:"pointer",
marginRight:"8px"
},


delete:{
border:"none",
background:"#fee2e2",
padding:"8px",
borderRadius:"6px",
cursor:"pointer"
}

}


export default Users;