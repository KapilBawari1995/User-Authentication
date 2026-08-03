
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  addProductRequest,
  clearAddProductState,
  getProductByIdRequest,
  updateProductRequest,
  clearUpdateProductState,
} from "../../features/product/productSlice";


export default function AddProduct() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("Product ID:", id);

  const {
    addLoading,
    addSuccess,
    addError,
    updateLoading,
    updateSuccess,
    updateError,
    productDetail,
    productLoading,
  } = useSelector(
    (state) => state.products
  );



  useEffect(() => {

    if (id) {

      dispatch(
        getProductByIdRequest({
          id,
        })
      );

    }

  }, [id, dispatch]);


  const formik = useFormik({

    initialValues: {

      name: "",
      category: "",
      price: "",

    },

    validationSchema: Yup.object({

      name: Yup.string()
        .required("Product Name is required"),

      category: Yup.string()
        .required("Category is required"),

      price: Yup.number()
        .typeError("Price must be number")
        .positive("Price must be greater than 0")
        .required("Price is required"),

    }),

    onSubmit: (values) => {

      if (id) {

        dispatch(
          updateProductRequest({
            id,
            data: values,
            navigate,
          })
        );

      } 
      else {

        dispatch(
          addProductRequest({
            data: values,
            navigate,
          })
        );

      }

    },

  });


  // ================= Fill Edit Data =================

  useEffect(() => {

    if (id && productDetail) {

      formik.setValues({

        name: productDetail.name || "",

        category: productDetail.category || "",

        price: productDetail.price || "",

      });

    }

  }, [productDetail, id]);


  // ================= Success Handlers =================

  useEffect(() => {

    if (addSuccess) {

      formik.resetForm();

      dispatch(
        clearAddProductState()
      );

    }

  }, [addSuccess, dispatch]);


  useEffect(() => {

    if (updateSuccess) {

      dispatch(
        clearUpdateProductState()
      );

    }

  }, [updateSuccess, dispatch]);


  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">

          {id ? "Edit Product" : "Add Product"}

        </h2>

        {
          productLoading && id && (

            <p className="text-center mb-4">
              Loading Product...
            </p>

          )
        }

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Product Name
            </label>

            <input

              type="text"

              name="name"

              value={formik.values.name}

              onChange={formik.handleChange}

              className="w-full border rounded-lg px-4 py-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Category
            </label>

            <input

              type="text"

              name="category"

              value={formik.values.category}

              onChange={formik.handleChange}

              className="w-full border rounded-lg px-4 py-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Price
            </label>

            <input

              type="number"

              name="price"

              value={formik.values.price}

              onChange={formik.handleChange}

              className="w-full border rounded-lg px-4 py-3"

            />

          </div>

          {
            (addError || updateError) && (

              <p className="text-red-500 text-center">

                {addError || updateError}

              </p>

            )
          }

          <button

            type="submit"

            disabled={addLoading || updateLoading}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"

          >

            {
              (addLoading || updateLoading)
                ? "Saving..."
                : id
                  ? "Update Product"
                  : "Add Product"
            }

          </button>

        </form>

      </div>

    </div>

  );

}
