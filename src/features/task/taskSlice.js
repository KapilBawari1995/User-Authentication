import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",

    initialState: {
        // =====================================================
        // TASK LIST
        // =====================================================

        tasks: [],
        totalCount: 0,

        getTasksLoading: false,
        getTasksSuccess: false,
        getTasksError: null,

        // =====================================================
        // GET TASK BY ID
        // =====================================================

        task: null,

        getTaskByIdLoading: false,
        getTaskByIdSuccess: false,
        getTaskByIdError: null,

        // =====================================================
        // CREATE TASK
        // =====================================================

        createLoading: false,
        createSuccess: false,
        createError: null,

        // =====================================================
        // UPDATE TASK
        // =====================================================

        updateLoading: false,
        updateSuccess: false,
        updateError: null,

        // =====================================================
        // DELETE TASK
        // =====================================================

        deleteLoading: false,
        deleteSuccess: false,
        deleteError: null,
    },

    reducers: {

        // =====================================================
        // GET TASKS
        // =====================================================

        getTasksRequest: (state) => {
            state.getTasksLoading = true;
            state.getTasksSuccess = false;
            state.getTasksError = null;
        },

        getTasksSuccess: (state, action) => {
            state.getTasksLoading = false;
            state.getTasksSuccess = true;
            state.getTasksError = null;

            state.tasks = action.payload.data;
            state.totalCount = action.payload.totalCount;
        },

        getTasksFailure: (state, action) => {
            state.getTasksLoading = false;
            state.getTasksSuccess = false;
            state.getTasksError = action.payload;
        },


        // =====================================================
        // GET TASK BY ID
        // =====================================================

        getTaskByIdRequest: (state) => {
            state.getTaskByIdLoading = true;
            state.getTaskByIdSuccess = false;
            state.getTaskByIdError = null;

            state.task = null;
        },

        getTaskByIdSuccess: (state, action) => {
            state.getTaskByIdLoading = false;
            state.getTaskByIdSuccess = true;
            state.getTaskByIdError = null;

            state.task = action.payload;
        },

        getTaskByIdFailure: (state, action) => {
            state.getTaskByIdLoading = false;
            state.getTaskByIdSuccess = false;
            state.getTaskByIdError = action.payload;
        },


        // =====================================================
        // CREATE TASK
        // =====================================================

        createTaskRequest: (state) => {
            state.createLoading = true;
            state.createSuccess = false;
            state.createError = null;
        },

        createTaskSuccess: (state, action) => {
            state.createLoading = false;
            state.createSuccess = true;
            state.createError = null;

            state.tasks.unshift(action.payload);
        },

        createTaskFailure: (state, action) => {
            state.createLoading = false;
            state.createSuccess = false;
            state.createError = action.payload;
        },


        // =====================================================
        // UPDATE TASK
        // =====================================================

        updateTaskRequest: (state) => {
            state.updateLoading = true;
            state.updateSuccess = false;
            state.updateError = null;
        },

        updateTaskSuccess: (state, action) => {
            state.updateLoading = false;
            state.updateSuccess = true;
            state.updateError = null;

            const index = state.tasks.findIndex(
                (item) => item._id === action.payload._id
            );

            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },

        updateTaskFailure: (state, action) => {
            state.updateLoading = false;
            state.updateSuccess = false;
            state.updateError = action.payload;
        },


        // =====================================================
        // DELETE TASK
        // =====================================================

        deleteTaskRequest: (state) => {
            state.deleteLoading = true;
            state.deleteSuccess = false;
            state.deleteError = null;
        },

        deleteTaskSuccess: (state, action) => {
            state.deleteLoading = false;
            state.deleteSuccess = true;
            state.deleteError = null;

            state.tasks = state.tasks.filter(
                (item) => item._id !== action.payload
            );
        },

        deleteTaskFailure: (state, action) => {
            state.deleteLoading = false;
            state.deleteSuccess = false;
            state.deleteError = action.payload;
        },


        // =====================================================
        // CLEAR ALL TASK API STATES
        // =====================================================

        clearTaskState: (state) => {

            // GET TASKS
            state.getTasksLoading = false;
            state.getTasksSuccess = false;
            state.getTasksError = null;

            // GET TASK BY ID
            state.getTaskByIdLoading = false;
            state.getTaskByIdSuccess = false;
            state.getTaskByIdError = null;

            // TASK
            state.task = null;

            // CREATE
            state.createLoading = false;
            state.createSuccess = false;
            state.createError = null;

            // UPDATE
            state.updateLoading = false;
            state.updateSuccess = false;
            state.updateError = null;

            // DELETE
            state.deleteLoading = false;
            state.deleteSuccess = false;
            state.deleteError = null;
        },
    },
});

export const {
    getTasksRequest,
    getTasksSuccess,
    getTasksFailure,

    getTaskByIdRequest,
    getTaskByIdSuccess,
    getTaskByIdFailure,

    createTaskRequest,
    createTaskSuccess,
    createTaskFailure,

    updateTaskRequest,
    updateTaskSuccess,
    updateTaskFailure,

    deleteTaskRequest,
    deleteTaskSuccess,
    deleteTaskFailure,

    clearTaskState,
} = taskSlice.actions;

export default taskSlice.reducer;