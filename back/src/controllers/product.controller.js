import Product from "../models/Product.js";


const getProducts = async (req, res) => {
  try {

    const page = parseInt(req.body.page) || 1;
    const pagesize = parseInt(req.body.pagesize) || 10;
    const search = req.body.search || "";


    const query = {};


    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }


    const totalCount = await Product.countDocuments(query);


    const products = await Product.find(query)
      .skip((page - 1) * pagesize)
      .limit(pagesize);


    return res.status(200).json({
      success: true,
      products,
      totalCount,
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




const addProduct = async (req, res) => {
  try {

    const { name, category, price } = req.body;


    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, Category and Price are required.",
      });
    }


    const product = await Product.create({
      name,
      category,
      price,
    });



    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product,
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;


    const product = await Product.findById(id);


    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


    await Product.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




const getProductById = async (req, res) => {
  try {

    const { id } = req.params;


    const product = await Product.findById(id);


    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


    return res.status(200).json({
      success: true,
      product,
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(category && { category }),
        ...(price && { price }),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  getProducts,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};