import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRequest, deleteProductRequest,getProductByIdRequest} from "../../features/product/productSlice";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProductsPage() {
  const dispatch = useDispatch();

const navigate = useNavigate();
  const { products, totalCount, loading, error } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getProductsRequest({
        page: currentPage,
        pagesize,
        search,
      })
    );
  }, [dispatch, currentPage, pagesize, search]);


  const totalPages = Math.ceil(totalCount / pagesize);


  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  // Edit
const handleEdit = (id) => {

  console.log("Edit ID:", id);

  navigate(`/edit-product/${id}`);

};


 const handleDelete = (id) => {

    dispatch(
      deleteProductRequest({
        id
      })
    );


};


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Products
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your products
            </p>
          </div>


          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="
            mt-4 md:mt-0
            w-72
            px-4 py-3
            rounded-xl
            border
            bg-white
            shadow-sm
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "
          />

        </div>



        <div className="
          bg-white 
          rounded-2xl 
          shadow-lg 
          p-6
        ">


          {/* Top */}
          <div className="
            flex 
            justify-between 
            items-center 
            mb-5
          ">


            <h3 className="text-xl font-semibold">
              Product List
            </h3>


            <select
              value={pagesize}
              onChange={(e)=>{
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="
              border
              rounded-lg
              px-4 py-2
              "
            >

              <option value={5}>
                5 Rows
              </option>

              <option value={10}>
                10 Rows
              </option>

              <option value={20}>
                20 Rows
              </option>

              <option value={50}>
                50 Rows
              </option>

            </select>


          </div>



          {
            loading && (
              <div className="text-center py-10">
                Loading...
              </div>
            )
          }



          {
            error && (
              <p className="text-red-500 text-center">
                {error}
              </p>
            )
          }



          {
            !loading && !error && (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">


                <thead>

                  <tr className="bg-blue-600 text-white">


                    <th className="px-4 py-3 text-left">
                      #
                    </th>


                    <th className="px-4 py-3 text-left">
                      Product
                    </th>


                    <th className="px-4 py-3 text-left">
                      Category
                    </th>


                    <th className="px-4 py-3 text-left">
                      Price
                    </th>


                    <th className="px-4 py-3 text-center">
                      Action
                    </th>


                  </tr>


                </thead>



                <tbody>


                {
                  products.length > 0 ?

                  products.map((item,index)=>(


                  <tr
                    key={item._id}
                    className="
                    border-b
                    hover:bg-gray-50
                    transition
                    "
                  >


                    <td className="px-4 py-4">
                      {
                        (currentPage-1)*pagesize+index+1
                      }
                    </td>



                    <td className="px-4 py-4 font-medium">
                      {item.name}
                    </td>



                    <td className="px-4 py-4">

                      <span className="
                      bg-green-100
                      text-green-700
                      px-3 py-1
                      rounded-full
                      text-sm
                      ">
                        {item.category}
                      </span>

                    </td>



                    <td className="
                    px-4 py-4
                    font-semibold
                    text-blue-600
                    ">
                      ₹{item.price}
                    </td>




                    <td className="px-4 py-4 text-center">


                      <button
                        onClick={()=>handleEdit(item._id)}
                        className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        p-2
                        rounded-lg
                        mr-2
                        "
                      >

                        <Pencil size={18}/>

                      </button>



                      <button
                        onClick={()=>handleDelete(item._id)}
                        className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        p-2
                        rounded-lg
                        "
                      >

                        <Trash2 size={18}/>

                      </button>


                    </td>


                  </tr>


                  ))

                  :

                  (
                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-8 text-gray-500"
                      >
                        No Products Found
                      </td>

                    </tr>
                  )


                }


                </tbody>


              </table>


            </div>

            )
          }



          {/* Pagination */}

          <div className="
          flex 
          justify-between 
          items-center 
          mt-6
          ">


            <button
              onClick={()=>changePage(currentPage-1)}
              disabled={currentPage===1}
              className="
              px-4 py-2
              bg-gray-700
              text-white
              rounded-lg
              disabled:bg-gray-300
              "
            >
              Previous
            </button>



            <span className="text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>



            <button
              onClick={()=>changePage(currentPage+1)}
              disabled={currentPage===totalPages}
              className="
              px-4 py-2
              bg-blue-600
              text-white
              rounded-lg
              disabled:bg-gray-300
              "
            >
              Next
            </button>


          </div>


        </div>

      </div>


    </div>
  );
}