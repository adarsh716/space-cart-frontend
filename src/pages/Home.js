import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import React, { useState } from 'react';
function Home() {
    const [searchFilter,setSearchFilter]=useState("")
    return (
        <div>
            <NavBar setSearchFilter={setSearchFilter} searchFilter={searchFilter}></NavBar>
            <div className='bg-image' style={{ marginTop: "-65px" }}>
      <img src={require("./c1.png")} alt='' style={{ width: "100%",height:"350px" }} />
      <div  style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
    </div>
                <ProductList></ProductList>
            <Footer></Footer>
        </div>
    );
}

export default Home;