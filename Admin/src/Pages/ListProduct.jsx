import React, { useEffect, useState } from "react";
import EditModal from "../Components/EditModal/EditModal";
import { MdDelete, MdEdit } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Loader from '../Components/Loader/loader';

function ListProduct() {

  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const filteredProducts = allProduct.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateProduct = (updatedProduct) => {
    setAllProduct(prevProduct =>
      prevProduct.map(product =>
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

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/allproduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setAllProduct(data);
      } else {
        console.error("Failed to fetch products:", data);
      }
    } catch (error) {
      console.error("Error in fetchInfo:", error);
    } finally {
      setLoading(false);
    }
  };

  const remove_product = async (id) => {
    try {
      await fetch(`${backend_url}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setAllProduct(allProduct.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(()=>{
    
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }

    return()=>{
      document.body.style.overflow = 'auto'
    }


  },[isModalOpen])

  useEffect(() => {
    fetchInfo();
  }, []);

  return (

    <div className="min-h-screen w-10/12 absolute top-0 right-0  bg-gray-50  sm:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Inventory</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">

          <div className="relative w-full sm:w-96">

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={fetchInfo}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Refresh
          </button>

        </div>

        {/* Product List */}
        {loading ? (

          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )
          : filteredProducts.length === 0 ? (

            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>

          ) : (

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">

              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 bg-gray-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {/* Product Items */}
              <div className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (

                  <div key={product.id} className="grid grid-cols-1 sm:grid-cols-12 px-6 py-4 hover:bg-gray-50">
                  
                    {/* Product Info (Mobile) */}
                    <div className="sm:hidden mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          className="w-16 h-16 object-cover rounded-md"
                          alt={product.name}
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">${product.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Product Info (Desktop) */}
                    <div className="hidden sm:flex items-center col-span-5">
                      <img
                        src={product.images[0]}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                        alt={product.name}
                      />
                      <h3 className="text-md font-medium text-gray-900">{product.name}</h3>
                    </div>
                    <div className="hidden sm:flex items-center col-span-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center col-span-2 font-medium text-green-600">
                      ${product.price}
                    </div>
                    <div className="col-span-12 sm:col-span-3 flex justify-end space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => remove_product(product.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          product={selectedProduct}
          onSave={updateProduct}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default ListProduct;