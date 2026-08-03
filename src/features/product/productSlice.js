import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({

  name: "products",


  initialState: {

    products: [],
    totalCount: 0,

    loading: false,
    error: null,


    addLoading: false,
    addSuccess: false,
    addError: null,


    deleteLoading: false,
    deleteSuccess: false,
    deleteError: null,


    productDetail: null,
    productLoading: false,
    productError: null,


    updateLoading: false,
    updateSuccess: false,
    updateError: null,


  },


  reducers: {




    getProductsRequest: (state) => {

      state.loading = true;
      state.error = null;

    },


    getProductsSuccess: (state, action) => {

      state.loading = false;

      state.products = action.payload.data;

      state.totalCount = action.payload.totalCount;

    },


    getProductsFailure: (state, action) => {

      state.loading = false;

      state.error = action.payload;

    },







    addProductRequest: (state) => {

      state.addLoading = true;

      state.addSuccess = false;

      state.addError = null;

    },


    addProductSuccess: (state) => {

      state.addLoading = false;

      state.addSuccess = true;

    },


    addProductFailure: (state, action) => {

      state.addLoading = false;

      state.addError = action.payload;

    },


    clearAddProductState: (state) => {

      state.addSuccess = false;

      state.addError = null;

    },








    deleteProductRequest: (state) => {

      state.deleteLoading = true;

      state.deleteError = null;

      state.deleteSuccess = false;

    },


    deleteProductSuccess: (state) => {

      state.deleteLoading = false;

      state.deleteSuccess = true;

    },


    deleteProductFailure: (state, action) => {

      state.deleteLoading = false;

      state.deleteError = action.payload;

    },









    getProductByIdRequest: (state) => {

      state.productLoading = true;

      state.productError = null;

    },


    getProductByIdSuccess: (state, action) => {

      state.productLoading = false;

      state.productDetail = action.payload;

    },


    getProductByIdFailure: (state, action) => {

      state.productLoading = false;

      state.productError = action.payload;

    },
    updateProductRequest: (state) => {
      state.updateLoading = true;
      state.updateSuccess = false;
      state.updateError = null;
    },

    updateProductSuccess: (state) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    },

    updateProductFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },

    clearUpdateProductState: (state) => {
      state.updateSuccess = false;
      state.updateError = null;
    },




  },

});





export const {

  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,


  addProductRequest,
  addProductSuccess,
  addProductFailure,
  clearAddProductState,


  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,


  getProductByIdRequest,
  getProductByIdSuccess,
  getProductByIdFailure,


  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  clearUpdateProductState,


} = productSlice.actions;



export default productSlice.reducer;