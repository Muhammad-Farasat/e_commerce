import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Item } from "../Components/Item/Item";
import Footer from "../Components/Footer/Footer";
// import EditModal from '../Components/EditModal/EditModal';

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);

  return (
    <>
      <section className="flex justify-center mt-8 ">
        <div className="container ">
          <div className="mt-20 text-center ">
            <h1 className=" text-5xl tracking-wider font-Rajdhani-Medium  max-sm:text-2xl ">
              Collection Of {props.category}{" "}
            </h1>
          </div>

          <div className="grid grid-cols-4 gap-y-8 mt-12 mb-12 ">
            {all_product.map((item, i) => {
              console.log("I have reached here!", props.category);
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
