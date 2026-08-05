import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({

    name:"profile",


    initialState:{


        profile:null,

        loading:false,

        error:null,


    },


    reducers:{


        // ================= GET PROFILE =================


        getProfileRequest:(state)=>{

            state.loading = true;
            state.error = null;

        },


        getProfileSuccess:(state,action)=>{

            state.loading = false;

            state.profile = action.payload;

        },


        getProfileFailure:(state,action)=>{

            state.loading = false;

            state.error = action.payload;

        },


        clearProfile:(state)=>{

            state.profile = null;

            state.error = null;

        }


    }


});


export const {

    getProfileRequest,

    getProfileSuccess,

    getProfileFailure,

    clearProfile

}=profileSlice.actions;



export default profileSlice.reducer;