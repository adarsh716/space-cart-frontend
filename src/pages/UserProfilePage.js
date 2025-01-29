import NavBar from '../features/navbar/Navbar';
import UserProfile from '../features/user/components/UserProfile';
import React from 'react';

function UserProfilePage() {
  return (
    <div>
      <NavBar>
      </NavBar>
      <div className='bg-image' style={{ marginTop: "-65px" }}>
      <img src={require("./profile.png")} alt='' style={{ width: "100%",height:"350px" }} />
      <div  style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
    </div>
        <UserProfile></UserProfile>
    </div>
  );
}

export default UserProfilePage;