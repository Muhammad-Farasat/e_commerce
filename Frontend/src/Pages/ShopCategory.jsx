import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Item } from "../Components/Item/Item";
import Footer from "../Components/Footer/Footer";
// import EditModal from '../Components/EditModal/EditModal';

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);

  const handleRef = useRef(null)

  useEffect(()=>{
    if (handleRef.current) {
      handleRef.current.scrollIntoView({block: 'start'})
    }
  }, [props])

  return (
    <>
    <div ref={handleRef} />
      <section className="flex justify-center mt-8 max-sm:mt-0 ">
        <div className="container ">
          <div className="mt-20 text-center  ">
            <h1 className=" text-5xl tracking-wider font-Rajdhani-Medium  max-sm:text-2xl ">
              Collection Of {props.category}{" "}
            </h1>
          </div>

          <div
  className="
    grid grid-cols-4 gap-8 mt-12 mb-12 
    lg:grid-cols-4 lg:gap-8 lg:mt-12
    md:grid-cols-2 md:gap-6 md:mt-10 
    sm:grid-cols-2 sm:gap-4 sm:mt-8
    max-sm:grid-cols-1 max-sm:gap-y-12 max-sm:mt-4
  "
>
  {all_product.map((item, i) => {
    if (props.category === item.category) {
      return (
        <Item
          key={i}
          id={item.id}
          title={item.name}
          img={item.image}
          price={item.price}
        />
      );
    } else {
      return null;
    }
  })}
          </div>


        </div>
      </section>
      <Footer />
    </>
  );
}

export default ShopCategory;
