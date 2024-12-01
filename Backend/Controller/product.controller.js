import Product from '../Model/Product.js'
import User from '../Model/User.js'


export const allproduct =  async (req, res) => {
    try {
      let product = await Product.find({});
      res.send(product)
      console.log("Done!!");
  
    } catch (error) {
      console.log("This is error: " + error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

export const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name,
    })
}

export const updateproduct =  async (req, res) => {
  
    const { id, name, price, image, category } = req.body
  
    await Product.findOneAndUpdate(
      { id: id },
      { name, price, image, category },
      { new: true }
    )
    console.log("It has been updated!!");
    res.json({
      success: true,
      message: "Product updated successfully",
      // product: updatedProduct,
    })
}

export const addProduct = async (req, res) => {
  
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
  
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    });
    // console.log("Working state")
    console.log(product)
    await product.save()
    console.log("saved")
    res.json({
      success: true,
      name: req.body.name
    })
}

export const newCollection = async(req, res)=>{
    let product = await Product.find({})
    let newCollection = product.slice(1).slice(-8)
    res.send(newCollection)
}

export const popularWomen = async(req, res)=>{
    let product = await Product.find({category:'Women'})
    let popWomen = product.slice(0,4)
    res.send(popWomen)
    console.log(popWomen);
  
  
}

export const addtocart = async (req, res) => {
  try {
    // Fetch user data by ID
    let userData = await User.findOne({ _id: req.user.id });

    // Check if user exists
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Increment item count or set it to 1 if it doesn't exist
    const itemId = req.body.itemId;
    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;

    // Update database
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error in addtocart:', error.message);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
}

export const removefromcart = async (req, res) => {
  try {
    // Fetch user data by ID
    let userData = await User.findOne({ _id: req.user.id });

    // Check if user exists
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if cartData exists
    if (!userData.cartData || !userData.cartData[req.body.itemId]) {
      return res.status(400).json({ error: 'Item not in cart' });
    }

    // Decrement item count and remove if it reaches 0
    const itemId = req.body.itemId;
    userData.cartData[itemId] -= 1;

    if (userData.cartData[itemId] <= 0) {
      delete userData.cartData[itemId]; // Remove item from cart
    }

    // Update database
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error in removefromcart:', error.message);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from request
    const userData = await User.findById(userId); // Query database for user

    // console.log(userId);

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return cartData or empty object if not initialized
    res.json(userData.cartData || {});
  } catch (error) {
    console.error('Error in getCart:', error.message);
    res.status(500).json({ error: 'Failed to fetch cart data' });
  }
}


