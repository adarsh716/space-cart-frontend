import NavBar from '../features/navbar/Navbar';
import UserOrders from '../features/user/components/UserOrders';
import React from 'react';

function UserOrdersPage() {
  return (
    <div>
      <NavBar>
      </NavBar>
      <div className='bg-image' style={{ marginTop: "-65px" }}>
      <img src={require("./order.png")} alt='' style={{ width: "100%",height:"350px" }} />
      <div  style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
    </div>
        <UserOrders></UserOrders>
    </div>
  );
}

export default UserOrdersPage;
