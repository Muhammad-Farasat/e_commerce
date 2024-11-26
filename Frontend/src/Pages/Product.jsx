import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// import all_product from '../assets/all_product';
import { ShopContext } from '../Context/ShopContext';



function Product() {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id===Number(productId))

  return (
    <>
      <ProductDisplay product={product} />
    </>
  )
}

export default Product