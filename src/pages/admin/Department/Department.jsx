
import  { useEffect } from "react";
import useDepartmentStore from "../../../Store/useDepartmentStore";

const Department = () => {
  const {
    departments,
    getDepartments,
  } = useDepartmentStore();

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);



  return (
    <div>
      <h2>Departments</h2>

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <ul>
          {departments.map((department) => (
            <li key={department._id}>
              {department.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Department;