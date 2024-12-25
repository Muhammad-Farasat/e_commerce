import React, { useEffect, useState } from "react";
import EditModal from "../Components/EditModal/EditModal";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function ListProduct() {
  const [allProduct, setAllProduct] = useState([]);
  // const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const updateProduct = (updatedProduct) => {
    setAllProduct((prevProduct) =>
      prevProduct.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Ends here

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${backend_url}/allproduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log(data);

      const data = await response.json();
      if (response.ok) {
        console.log("Product added:", data);
        setAllProduct(data);
      } else {
        console.error("Failed to add product:", data);
      }
    } catch (error) {
      console.error("Error in fetchInfo:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setAllProduct(allProduct.filter((product) => product.id !== id));
  };

  return (
    <>
      <section className="mx-auto h-[100vh] overflow-x-hidden px-4">
        <div>
          <h1 className="font-bold text-4xl text-center mt-8 max-md:text-2xl">
            List of Products
          </h1>
        </div>

        <div className="product-list mt-12 grid gap-6 w-full max-xl:w-[85%] mx-auto max-md:w-full">
          {allProduct.map((product, index) => (
            <div
              key={index}
              className="product-item flex justify-between items-center p-6 border rounded-lg bg-gray-50 shadow-md max-lg:flex-col max-lg:items-start max-lg:gap-4"
            >
              <div className="product-image w-20 max-md:w-16 max-sm:w-12">
                <img
                  src={product.image}
                  className="w-full h-auto rounded-md"
                  alt={product.name}
                />
              </div>
              <div className="product-details flex-1 mx-6 max-lg:mx-4">
                <h3 className="product-name text-2xl font-medium text-gray-800 max-lg:text-xl max-md:text-lg">
                  {product.name}
                </h3>
                <p className="product-category text-md text-gray-500 max-md:text-sm">
                  Category: {product.category}
                </p>
                <p className="product-price text-xl font-bold text-green-600 max-md:text-md">
                  ${product.price}
                </p>
              </div>
              <div className="product-actions flex gap-4 max-lg:gap-2">
                <button
                  onClick={() => remove_product(product.id)}
                  className="delete-btn bg-red-500 text-white px-4 py-2 text-lg rounded-md shadow-md hover:bg-red-600 max-md:px-3 max-md:py-1 max-md:text-sm"
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => handleEditClick(product)}
                  className="edit-btn bg-blue-500 text-white px-4 py-2 text-lg rounded-md shadow-md hover:bg-blue-600 max-md:px-3 max-md:py-1 max-md:text-sm"
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <EditModal
          product={selectedProduct}
          onSave={updateProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default ListProduct;
