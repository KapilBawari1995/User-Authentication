import { create } from "zustand";
import { getDepartmentsApi } from "../Service/departmentService";
import { errorToast } from "../utils/toast";

const useDepartmentStore = create((set) => ({
  departments: [],
  loading: false,
  error: null,

  getDepartments: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await getDepartmentsApi();

      set({
        departments: response.data?.data,
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message

      set({
        loading: false,
        error: message,
      });

      errorToast(message);
    }
  },

  clearDepartments: () => {
    set({
      departments: [],
      loading: false,
      error: null,
    });
  },
}));

export default useDepartmentStore;