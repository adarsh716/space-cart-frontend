import React, { useState, useEffect } from "react";
import { fetchUserCount, fetchOrderCount, fetchProductCount,fetchAllProductst } from "./userApi";



const Dashboard = () => {
    const [userCount, setUserCount] = useState(null);
    const [orderCount, setOrderCount] = useState(null);
    const [productCount, setProductCount] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCount = async () => {
            try {
                const userResponse = await fetchUserCount();
                const orderResponse = await fetchOrderCount();
                const productResponse = await fetchProductCount();
                const allProduct = await fetchAllProductst()
                
                setProducts(allProduct.data.products);
                setUserCount(userResponse.data.userCount);
                setOrderCount(orderResponse.data.userOrders);
                setProductCount(productResponse.data.productCount);
            } catch (error) { 
                console.error("Error fetching count data:", error);
            }
        };
    
        getCount();
    }, []);
    
    return (
        <div className="flex">
            <aside className="w-64 bg-white text-black h-screen">
                <h2 className="text-xl font-bold mb-4 text-center mt-4 text-[30px]">3legant</h2>
                <nav className="p-0">
                    <ul className="p-2">
                        <li className="p-3 bg-black text-white rounded-lg"><a className="text-white" href="/admin-dashboard">Dashboard</a></li>
                        <li className="p-3 hover:bg-gray-500 rounded-lg"><a className="text-black" href="/order-dashboard">Orders</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </header>

                <section className="grid grid-cols-4 gap-4 mt-6">
                    {[{
                        title: "Total User",
                        value: userCount !== null ? userCount : "Loading...",
                    },
                    {
                        title: "Total Order",
                        value: orderCount !== null ? orderCount : "Loading...",
                    },
                    {
                        title: "Total Products",
                        value: productCount !== null ? productCount : "Loading...",
                    }].map((item, index) => (
                        <div key={index} className="p-4 bg-white shadow rounded-lg">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-2xl font-bold text-green-500">{item.value}</p>
                        </div>
                    ))}
                </section>

                <section className="mt-6 p-6 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Deals Details</h2>
                        <button className="bg-black text-white px-4 py-2 rounded-lg"><a href="/admin/product-form" className="text-white">Add New Product</a></button>
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
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        <td className="px-4 py-2 text-black">{product.title}</td>
                                        <td className="px-4 py-2">Rs{" "}{product.price}</td>
                                        <td className="px-4 py-2">{product.brand}</td>
                                        <td className="px-4 py-2">{product.category}</td>
                                        <td className="px-4 py-2">{product.stock}</td>
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
