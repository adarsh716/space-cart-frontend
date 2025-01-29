import AdminOrders from "../features/admin/components/AdminOrders";
import NavBar from "../features/navbar/Navbar";

function AdminOrdersPage() {
    return (
        <div>
            <NavBar>
            </NavBar>
            <AdminOrders></AdminOrders>
        </div>
    );
}

export default AdminOrdersPage;