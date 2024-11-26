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

export const addtocart = async(req, res)=>{
  let userData = await User.findOne({_id: req.user.id})
  userData.cartData[req.body.itemId] += 1

  await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
  res.send({message: "added"})

}

export const removefromcart = async(req, res)=>{
  let userData = await User.findOne({_id: req.user.id})
  userData.cartData[req.body.itemId] -= 1

  await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
  res.send({message: "removed"})
}

export const getCart = async (req, res)=>{
  let userData = await User.findOne({_id: req.user.id})
  res.json(userData.cartData)
}