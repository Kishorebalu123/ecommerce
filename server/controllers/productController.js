const Product = require('../models/product');

const getProducts = async (req, res) => {
  const { sort_by, category, title_search, rating } = req.query;

  
    // MongoDB filter query
    const query = {};

    // Filter by category if provided
    if (category) query.category = category;

    // Search by title (case-insensitive)
    if (title_search) query.title = { $regex: new RegExp(title_search, 'i') }; // 'i' makes it case-insensitive
    
    // Filter by rating (greater than or equal to)
    if (rating) query.rating = { $gte: Number(rating) }; // Convert rating to number
    
    // Sorting options for price
    let sortOptions = {};
    if (sort_by === 'PRICE_HIGH') sortOptions.price = -1; // Sort by price descending (high to low)
    if (sort_by === 'PRICE_LOW') sortOptions.price = 1; // Sort by price ascending (low to high)
      
    // Fetch products from the database
    try {
    const products = await Product.find(query).sort(sortOptions);
        res.status(200).json({products});
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={getProducts,getProductById}