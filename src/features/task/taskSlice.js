import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({

    name: "task",

    initialState: {

        tasks: [],
        totalCount: 0,

        loading: false,
        error: null,

        task: null,

        createLoading: false,
        createSuccess: false,
        createError: null,

        updateLoading: false,
        updateSuccess: false,

        deleteLoading: false,

    },


    reducers:{


        // ================= GET TASK =================

        getTasksRequest:(state)=>{
            state.loading = true;
            state.error = null;
        },


        getTasksSuccess:(state,action)=>{

            state.loading = false;

            state.tasks = action.payload.data;

            state.totalCount = action.payload.totalCount;

        },


        getTasksFailure:(state,action)=>{

            state.loading = false;

            state.error = action.payload;

        },



        // ================= CREATE TASK =================


        createTaskRequest:(state)=>{

            state.createLoading = true;
            state.createSuccess = false;
            state.createError = null;

        },


        createTaskSuccess:(state,action)=>{

            state.createLoading = false;
            state.createSuccess = true;

            state.tasks.unshift(action.payload);

        },


        createTaskFailure:(state,action)=>{

            state.createLoading = false;
            state.createError = action.payload;

        },



        // ================= UPDATE TASK =================


        updateTaskRequest:(state)=>{

            state.updateLoading = true;

        },


        updateTaskSuccess:(state,action)=>{

            state.updateLoading = false;

            const index = state.tasks.findIndex(
                item=>item._id === action.payload._id
            );


            if(index !== -1){

                state.tasks[index] = action.payload;

            }

        },


        updateTaskFailure:(state,action)=>{

            state.updateLoading = false;

            state.error = action.payload;

        },



        // ================= DELETE TASK =================


        deleteTaskRequest:(state)=>{

            state.deleteLoading = true;

        },


        deleteTaskSuccess:(state,action)=>{

            state.deleteLoading = false;


            state.tasks =
            state.tasks.filter(
                item=>item._id !== action.payload
            );

        },


        deleteTaskFailure:(state,action)=>{

            state.deleteLoading = false;

            state.error = action.payload;

        },



        // ================= CLEAR =================


        clearTaskState:(state)=>{

            state.createSuccess = false;
            state.error = null;

        }


    }

});



export const {

    getTasksRequest,
    getTasksSuccess,
    getTasksFailure,

    createTaskRequest,
    createTaskSuccess,
    createTaskFailure,

    updateTaskRequest,
    updateTaskSuccess,
    updateTaskFailure,

    deleteTaskRequest,
    deleteTaskSuccess,
    deleteTaskFailure,

    clearTaskState

}=taskSlice.actions;



export default taskSlice.reducer;