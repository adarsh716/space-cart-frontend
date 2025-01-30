import React, { useState, useEffect, Fragment } from "react";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import {
  fetchUserCount,
  fetchOrderCount,
  fetchProductCount,
  fetchAllProductst,
  deleteProduct,
} from "./userApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../product/productSlice";
import { fetchCategories } from "../product/productAPI";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";


const userNavigation = [{ name: "Sign out", link: "/logout" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const [userCount, setUserCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useSelector(selectCategories);
  const [filteredProducts, setFilteredProducts] = useState([]);
  

  // if(userInfo?.role !== "admin"){
  //   navigate("/");
  // }

  useEffect(() => {
    const getCount = async () => {
      try {
        const userResponse = await fetchUserCount();
        const orderResponse = await fetchOrderCount();
        const productResponse = await fetchProductCount();
        const allProduct = await fetchAllProductst();

        setProducts(allProduct.data.products);
        setFilteredProducts(allProduct.data.products);
        setUserCount(userResponse.data.userCount);
        setOrderCount(orderResponse.data.userOrders);
        setProductCount(productResponse.data.productCount);
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };
    getCount();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await deleteProduct(id);
      if (response?.data?.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-white text-black h-screen">
        <h2 className="text-xl font-bold mb-4 text-center mt-4 text-[30px]">
          3legant
        </h2>
        <nav className="p-0">
          <ul className="p-2">
            <li className="p-3 bg-black text-white rounded-lg">
              <a className="text-white" href="/admin-dashboard">
                Dashboard
              </a>
            </li>
            <li className="p-3 hover:bg-gray-500 rounded-lg">
              <a className="text-black" href="/order-dashboard">
                Orders
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link
            to="/logout"
            className={classNames(
              "block px-4 py-2 text-sm text-gray-700"
            )}
          >
            Logout
          </Link>
        </header>

        <section className="grid grid-cols-4 gap-4 mt-6">
          {[
            { title: "Total User", value: userCount ?? "Loading..." },
            { title: "Total Order", value: orderCount ?? "Loading..." },
            { title: "Total Products", value: productCount ?? products.length },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold text-green-500">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 p-6 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Deals Details</h2>
            <div className="flex gap-4">
              <select
                className="border rounded-lg px-3 py-2 w-60"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Products</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                <a href="/admin/product-form" className="text-white">
                  Add New Product
                </a>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Product Price</th>
                  <th className="px-4 py-2">Brand</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-2 text-black">{product.title}</td>
                    <td className="px-4 py-2">Rs {product.price}</td>
                    <td className="px-4 py-2">{product.brand}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2 flex space-x-3">
                      <a
                        href={`/admin/product-form/edit/${product.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <RiEdit2Line size={20} />
                      </a>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <RiDeleteBinLine size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
