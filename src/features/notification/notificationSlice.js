import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({

    name:"notification",

    initialState:{

        notifications: [],

        loading:false,

        error:null,

        totalCount:0,

    },


    reducers:{


        // ================= GET NOTIFICATIONS =================

        getNotificationsRequest:(state)=>{

            state.loading = true;

            state.error = null;

        },


        getNotificationsSuccess:(state,action)=>{

            state.loading = false;

            state.notifications = action.payload.data;

            state.totalCount = action.payload.totalCount;

        },


        getNotificationsFailure:(state,action)=>{

            state.loading = false;

            state.error = action.payload;

        },


    }


});


export const {

    getNotificationsRequest,

    getNotificationsSuccess,

    getNotificationsFailure


}=notificationSlice.actions;



export default notificationSlice.reducer;