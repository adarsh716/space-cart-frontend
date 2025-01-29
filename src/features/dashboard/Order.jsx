import React from "react";
import AdminOrders from "../admin/components/AdminOrders";

const OrderDash = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-white text-black h-screen">
        <h2 className="text-xl font-bold mb-4 text-center mt-4 text-[30px]">
          3legant
        </h2>
        <nav className="p-0">
          <ul className="p-2">
            <li className="p-3 hover:bg-gray-500 rounded-lg">
              <a className="text-black" href="/admin-dashboard">
                Dashboard
              </a>
            </li>
            <li className="p-3 bg-black text-white rounded-lg">
              <a className="text-white" href="#">
                Orders
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>
        <AdminOrders />
      </main>
    </div>
  );
};

export default OrderDash;
