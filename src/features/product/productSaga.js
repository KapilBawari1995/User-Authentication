import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import { successToast, errorToast } from "../../utils/toast";


import {

  // Product List
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,


  // Add Product
  addProductRequest,
  addProductSuccess,
  addProductFailure,


  // Delete Product
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,


  // Get Single Product
  getProductByIdRequest,
  getProductByIdSuccess,
  getProductByIdFailure,


  updateProductRequest,
updateProductSuccess,
updateProductFailure,


} from "./productSlice";





// ================= Common Success =================

const onSuccess = (message, navigate, path) => {

  successToast(message);


  if (navigate) {
    navigate(path);
  }

};





// ================= Product List =================

function* handleGetProducts(action) {

  try {


    const payloadData = action.payload || {

      page: 1,
      pagesize: 10,
      search: "",

    };



    const response = yield call(

      axiosInstance.post,

      API_ENDPOINTS.GET_PRODUCTS,

      payloadData

    );



    yield put(

      getProductsSuccess({

        data: response.data.products,

        totalCount: response.data.totalCount,

      })

    );



  } catch (error) {


    yield put(

      getProductsFailure(error.message)

    );


  }

}





// ================= Add Product =================

function* handleAddProduct(action) {

  try {


    const { data, navigate } = action.payload;



    const response = yield call(

      axiosInstance.post,

      API_ENDPOINTS.ADD_PRODUCT,

      data

    );



    yield put(

      addProductSuccess(response.data)

    );



    onSuccess(

      response.data.message,

      navigate,

      "/"

    );





    // refresh list

    yield put(

      getProductsRequest({

        page: 1,

        pagesize: 10,

        search: "",

      })

    );




  } catch (error) {


    const message =

      error.response?.data?.message ||

      error.message;



    yield put(

      addProductFailure(message)

    );



    errorToast(message);


  }

}







// ================= Delete Product =================

function* handleDeleteProduct(action) {

  try {


    const { id } = action.payload;



    const response = yield call(

      axiosInstance.delete,

      `${API_ENDPOINTS.DELETE_PRODUCT}/${id}`

    );





    yield put(

      deleteProductSuccess()

    );





    successToast(

      response.data.message

    );





    // refresh list

    yield put(

      getProductsRequest({

        page: 1,

        pagesize: 10,

        search: "",

      })

    );




  } catch (error) {


    const message =

      error.response?.data?.message ||

      error.message;



    yield put(

      deleteProductFailure(message)

    );



    errorToast(message);


  }

}







// ================= Get Single Product =================

function* handleGetProductById(action) {

  try {


    const { id } = action.payload;




    const response = yield call(

      axiosInstance.get,

      `${API_ENDPOINTS.GET_PRODUCT_BY_ID}/${id}`

    );





    yield put(

      getProductByIdSuccess(

        response.data.product

      )

    );




  } catch (error) {



    const message =

      error.response?.data?.message ||

      error.message;



    yield put(

      getProductByIdFailure(message)

    );



    errorToast(message);


  }

}



function* handleUpdateProduct(action) {
  try {
    const { id, data, navigate } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.UPDATE_PRODUCT}/${id}`,
      data
    );

    yield put(
      updateProductSuccess(response.data)
    );

    onSuccess(
      response.data.message,
      navigate,
      "/"
    );

    // Refresh list
    yield put(
      getProductsRequest({
        page: 1,
        pagesize: 10,
        search: "",
      })
    );

  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    yield put(
      updateProductFailure(message)
    );

    errorToast(message);
  }
}





// ================= Watcher =================

export default function* productSaga() {


  yield takeLatest(

    getProductsRequest.type,

    handleGetProducts

  );



  yield takeLatest(

    addProductRequest.type,

    handleAddProduct

  );



  yield takeLatest(

    deleteProductRequest.type,

    handleDeleteProduct

  );



  yield takeLatest(

    getProductByIdRequest.type,

    handleGetProductById

  );


  
yield takeLatest(
    updateProductRequest.type,
    handleUpdateProduct
  );




}